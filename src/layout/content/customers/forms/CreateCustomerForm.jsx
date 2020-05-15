import React from 'react'
import * as Yup from 'yup'
import { Form, Col, InputGroup, Button } from 'react-bootstrap'
import { createStructuredSelector } from 'reselect'
import { selectCities } from '../../../../redux/cities/cities.selectors'
import { connect } from 'react-redux'
import { uid } from 'react-uid'
import Spinner from '../../../../components/spinner/spinner';
import { Formik } from 'formik'
import { sanitizeString } from '../../../../helpers/helper'
import AxiosAgent from '../../../../axios-agent'
import { addCustomerToState } from '../../../../redux/customers/customers.action'
import { showModalAlertAttempt } from '../../../../redux/fultechs/FulTechsActions'

const CreateCustomerForm = ({cities, closeModal, addCustomer, showModalAlert})=> {
    let initialVals = {
        customerNumber:'',
        customerFirstName: '',
        customerLastName: '',
        customerAddress: '',
        fkCity: '/api/cities/1'
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
                        .max(255,'Must not exceed 255 characters')
    });

    return (
        <Formik initialValues={initialVals} 
                validationSchema={validationSchema}
                onSubmit = {
                    (values, {setSubmitting, resetForm})=>{
                        const firstName = sanitizeString(values.customerFirstName),
                              lastName = sanitizeString(values.customerLastName),
                              address = sanitizeString(values.customerAddress),
                              mobileNumber = values.customerNumber,
                              fkCity = values.fkCity
                        const processValues = {
                            firstName,
                            lastName,
                            mobileNumber,
                            gender: "Male",
                            fkCity,
                            address
                        }
                        
                        AxiosAgent.request('post','customers',null, processValues)
                                .then(resp =>{
                                        
                                        addCustomer(resp.data)
                                        showModalAlert('success', 'check-circle', 'Customer Added')
                                        resetForm()
                                        setSubmitting(false)
                                    }
                                )
                                .catch(err => {
                                    console.log(err);
                                    showModalAlert('danger', 'block', 'There was an error adding customer')
                                    setSubmitting(false)
                                }
                        );
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
                            <Button className="btn-block" disabled={isSubmitting} variant="success" size="lg" type="submit">
                                {
                                    isSubmitting? <Spinner spinnerHeight="24px" spinnerFontSize="1.2em" spinnerRight="48%"/>: "Add Customer"
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
    showModalAlert: showModalAlertAttempt
}
const mapStateToProps = createStructuredSelector({
    cities: selectCities
})

export default connect(mapStateToProps, mapDispatchToProps)(CreateCustomerForm)
