import React, { useEffect, useState } from 'react'
import * as Yup from 'yup'
import { Form, Col, InputGroup, Button } from 'react-bootstrap'
import { createStructuredSelector } from 'reselect'
import { selectCities } from '../../../../redux/cities/cities.selectors'
import { connect } from 'react-redux'
import { uid } from 'react-uid'
import Spinner from '../../../../components/spinner/spinner';
import { Formik } from 'formik'
import { sanitizeString, customerExists, customerEmailExists } from '../../../../helpers/helper'
import { addCustomerToState, setCustomerModalHeadingAttempt, updateCustomerAttempt } from '../../../../redux/customers/customers.action'
import { showModalAlertAttempt } from '../../../../redux/fultechs/FulTechsActions'
import { selectCustomers, selectCurrentCustomer, selectCustomerModalHeading } from '../../../../redux/customers/customers.selectors'
import API_ROUTES from '../../../../api-route'
import AxiosAgent from '../../../../axios-agent'

const ModifyCustomerForm = ({cities,updateCustomer,setModalHeading, modalHeading, customers, customerId, closeModal, addCustomer, showModalAlert})=> {
    const customer = customers.filter(customer=>parseInt(customer.id)===parseInt(customerId))[0]
    useEffect(() => {
        setModalHeading("Modify Customer")
    }, [setModalHeading, modalHeading])
    const [genderRadio, setGender] = useState(customer.gender)
    const handleGender = genderM => {
        setGender(genderM)
        customer.gender=genderM
    }
    
    let initialVals = {
        customerNumber:customer.mobileNumber,
        customerFirstName: customer.firstName,
        customerLastName: customer.lastName,
        customerAddress: customer.address,
        fkCity: `/api/cities/${customer.fkCity.id}`,
        email: customer.email?customer.email:'',
        gender: customer.gender,
        customerId: customer.id
    }
    const validationSchema = Yup.object().shape({
        customerNumber: Yup.string()
                        .min(9,'Minimum 9 characters')
                        .required('Please enter number')
                        .matches(/^[0-9]+$/, 'Only Numbers accepted'),
     customerFirstName: Yup.string()
                        .required('Please enter First Name'),
          fkCity: Yup.string()
                        .required('Please select town'),
        customerAddress:Yup.string()
                        .required('Enter Address')
                        .max(255,'Must not exceed 255 characters'),
                  email:Yup.string()
                            .email('Invalid Email')
    });

    return (
        <Formik initialValues={initialVals} 
                validationSchema={validationSchema}
                onSubmit = {
                    (values, {setSubmitting, resetForm, setErrors})=>{
                        if(customerExists(values.customerNumber, customers)&&values.customerNumber!==customer.mobileNumber){
                            setErrors({customerNumber: 'This number already exists'})
                            return false
                        }
                        if(customerEmailExists(values.email, customers)&&values.email!==customer.email){
                            setErrors({email: 'This email already exists'})
                            return false
                        }
                        const firstName = sanitizeString(values.customerFirstName),
                              lastName = sanitizeString(values.customerLastName),
                              address = sanitizeString(values.customerAddress),
                              mobileNumber = values.customerNumber,
                              fkCity = values.fkCity,
                              email = values.email,
                              gender= genderRadio
                        const processValues = {
                            firstName,
                            lastName,
                            mobileNumber,
                            fkCity,
                            address,
                            email,
                            gender
                        }

                        AxiosAgent.request('patch', API_ROUTES.customers(values.customerId), null, processValues)
                            .then(resp=>{
                                console.log(resp.data)
                                updateCustomer(resp.data)
                                showModalAlert('success', 'check-circle', 'Customer Modified')
                                setSubmitting(false)
                            })
                            .catch(err=>{
                                console.log(err)
                                setSubmitting(false)
                                showModalAlert('danger', 'block', 'There was an error modifying customer')
                            })
                        
                    }
                }
        >
        {({values,errors, touched, handleChange, handleSubmit, handleBlur, isSubmitting, setFieldValue})=>{
            return(
                <Form onSubmit={handleSubmit}>
                    <Form.Row>
                        <Form.Group as={Col} md="4" controlId="customerValidateNumber">
                            <Form.Label>Phone Number</Form.Label>
                            <InputGroup>
                                <InputGroup.Prepend>
                                    <InputGroup.Text>
                                    <i className="icon-phone"></i>
                                    </InputGroup.Text>
                                </InputGroup.Prepend>
                                <Form.Control 
                                    type="text" 
                                    aria-describedby="inputGroupPrepend"
                                    name="customerNumber"
                                    value={values.customerNumber}
                                    placeholder="Phone Number"
                                    onChange={handleChange}
                                    autoComplete="off"
                                    onBlur={handleBlur}
                                    disabled={isSubmitting}
                                />
                            </InputGroup>
                            {touched.customerNumber&&errors.customerNumber&&
                                <Form.Control.Feedback style={{display:'block'}} type='invalid'>
                                    {errors.customerNumber}
                                </Form.Control.Feedback>
                            }
                        </Form.Group>
                        <Form.Group as={Col} md="4" controlId="customerValidateFirstName">
                            <Form.Label>First Name</Form.Label>
                            <InputGroup>
                                <InputGroup.Prepend>
                                    <InputGroup.Text>
                                    <i className="icon-user"></i>
                                    </InputGroup.Text>
                                </InputGroup.Prepend>
                                <Form.Control 
                                    type="text" 
                                    aria-describedby="inputGroupPrepend"
                                    name="customerFirstName"
                                    value={values.customerFirstName}
                                    placeholder="First Name"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    disabled={isSubmitting}
                                />
                            </InputGroup>
                            {touched.customerFirstName&&errors.customerFirstName&&
                                <Form.Control.Feedback style={{display:'block'}} type='invalid'>
                                    {errors.customerFirstName}
                                </Form.Control.Feedback>
                            }
                        </Form.Group>
                        
                        <Form.Group as={Col} md="4" controlId="customerValidateLastName">
                            <Form.Label>Last Name</Form.Label>
                            <InputGroup>
                                <InputGroup.Prepend>
                                    <InputGroup.Text>
                                    <i className="icon-user"></i>
                                    </InputGroup.Text>
                                </InputGroup.Prepend>
                                <Form.Control 
                                    type="text" 
                                    aria-describedby="inputGroupPrepend"
                                    name="customerLastName"
                                    value={values.customerLastName}
                                    placeholder="Last Name"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    disabled={isSubmitting}
                                />
                            </InputGroup>
                            {touched.customerLastName&&errors.customerLastName&&
                                <Form.Control.Feedback style={{display:'block'}} type='invalid'>
                                    {errors.customerLastName}
                                </Form.Control.Feedback>
                            }
                        </Form.Group>
                    </Form.Row>

                    <Form.Row>
                        <Form.Group as={Col} md={6} controlId="customerProfileEmail">
                            <Form.Label>Email</Form.Label>
                            <InputGroup>
                                <InputGroup.Prepend>
                                        <InputGroup.Text>
                                        <i className="icon-envelope"></i>
                                    </InputGroup.Text>
                                </InputGroup.Prepend>
                                <Form.Control 
                                    value={values.email}
                                    name="email"
                                    type="text" 
                                    placeholder="Email"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    disabled={isSubmitting}
                                />
                            </InputGroup>{touched.email&&errors.email&&
                                <Form.Control.Feedback style={{display:'block'}} type='invalid'>
                                    {errors.email}
                                </Form.Control.Feedback>
                            }
                        </Form.Group>
                        <Form.Group as={Col} md={6} controlId="customerProfileGender">
                            <Form.Label>Gender</Form.Label>
                            <InputGroup>
                                <div className="input-group">
                                    <div className="row">
                                        <div className="col-6 mt-10">
                                            <div className="custom-control custom-radio cursor-pointer" onClick={()=>handleGender('Female')} id="customerFemaleRadio">
                                                <input type="radio"
                                                    value="Female" 
                                                    id="customerGenderFemale" 
                                                    name="gender" 
                                                    className="custom-control-input" 
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    selected={values.gender==='Female'?true:false}
                                                    checked={genderRadio==='Male'?false:true}
                                                />
                                                <label className="custom-control-label cursor-pointer" htmlFor="customerGenderFemale" id="genderFemaleLabel">Female</label>
                                            </div>
                                        </div>
                                        <div className="col-6 mt-10">
                                            <div className="custom-control custom-radio cursor-pointer" onClick={()=>handleGender('Male')} id="customerMaleRadio">
                                                <input type="radio"
                                                    value="Male"
                                                    id="customerGenderMale" 
                                                    selected={values.gender==='Male'?true:false}
                                                    name="gender" 
                                                    className="custom-control-input" 
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    checked={genderRadio==='Male'?true:false}
                                                />
                                                <label className="custom-control-label cursor-pointer" htmlFor="customerGenderMale" id="genderMaleLabel">Male</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </InputGroup>
                        </Form.Group>
                    </Form.Row>

                    <Form.Row  className="form-row">
                        <Form.Group as={Col} controlId="customerValidateAddress">
                            <Form.Label>Address</Form.Label>
                            <InputGroup>
                                <InputGroup.Prepend>
                                    <InputGroup.Text>
                                    <i className="icon-location-pin"></i>
                                </InputGroup.Text>
                                </InputGroup.Prepend>
                                <Form.Control 
                                    value={values.customerAddress}
                                    name="customerAddress"
                                    type="text" 
                                    placeholder="Address"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    disabled={isSubmitting}
                                />
                                <InputGroup.Append>
                                    <select 
                                        id="fkCity" 
                                        className="form-control" 
                                        value={values.fkCity}
                                        onChange={handleChange}
                                        name="fkCity"
                                        onBlur={handleBlur}
                                        disabled={isSubmitting}
                                    >
                                        {
                                            cities
                                            .map(({code, id})=>(
                                                <option key={`city-${uid({id})}`} value={`/api/cities/${id}`}>{code}</option>
                                                ))
                                        }
                                    </select>
                                </InputGroup.Append>
                            </InputGroup>
                            {touched.customerAddress&&errors.customerAddress&&
                                <Form.Control.Feedback style={{display:'block'}} type='invalid'>
                                    {errors.customerAddress}
                                </Form.Control.Feedback>
                            }
                        </Form.Group>
                    </Form.Row>

                    <Form.Row>
                        <Form.Group as={Col} md="6" className="mb-md-0 mb-lg-0 mb-s-5" controlId="validationSubmitForm">
                            <Button className="btn-block" disabled={isSubmitting} variant="warning" size="lg" type="submit">
                                {
                                    isSubmitting? <Spinner spinnerHeight="24px" spinnerFontSize="1.2em" spinnerRight="48%"/>: "Modify"
                                }
                            </Button>
                        </Form.Group>
                        <Form.Group as={Col} md="6" className="mb-md-0 mb-lg-0 mb-s-5" controlId="validationCancel">
                            <Button className="btn-block" onClick={closeModal} disabled={isSubmitting} variant="secondary" size="lg" type="button">
                                Cancel
                            </Button>
                        </Form.Group>
                    </Form.Row>
                </Form>
            )
        }}

        </Formik>
    )
}

const mapDispatchToProps = {
    addCustomer: addCustomerToState,
    showModalAlert: showModalAlertAttempt,
    setModalHeading: setCustomerModalHeadingAttempt,
    updateCustomer: updateCustomerAttempt
}
const mapStateToProps = createStructuredSelector({
    cities: selectCities,
    customers: selectCustomers,
    customerId: selectCurrentCustomer,
    modalHeading: selectCustomerModalHeading
})

export default connect(mapStateToProps,mapDispatchToProps)(ModifyCustomerForm)
