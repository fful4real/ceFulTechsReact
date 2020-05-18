import React, { useEffect } from 'react'
import { Form, Col, InputGroup, Button } from 'react-bootstrap'
import { createStructuredSelector } from 'reselect'
import { selectCities } from '../../../../redux/cities/cities.selectors'
import { connect } from 'react-redux'
import { uid } from 'react-uid'
import Spinner from '../../../../components/spinner/spinner';
import { Formik } from 'formik'
import { addCustomerToState, setCustomerModalHeadingAttempt, deleteCustomerAttempt } from '../../../../redux/customers/customers.action'
import { showModalAlertAttempt } from '../../../../redux/fultechs/FulTechsActions'
import { selectCustomers, selectCustomerModalHeading, selectCurrentCustomer } from '../../../../redux/customers/customers.selectors'
import Axios from 'axios'
import { useState } from 'react'
import { Redirect } from 'react-router-dom'

const DeleteCustomerForm = ({cities, deleteCustomer, modalHeading, setModalHeading, customers, closeModal, addCustomer, showModalAlert, currentCustomer})=> {
    useEffect(() => {
        setModalHeading("Delete Customer")
    }, [setModalHeading,modalHeading])
    const [redirectLink, setRedirectLink] = useState('')
    const customer = customers.filter(mapCustomer=>mapCustomer.id===currentCustomer)[0]
    // console.log(customer)
    let initialVals = {
        customerNumber:customer.mobileNumber,
        customerFirstName: customer.firstName,
        customerLastName: customer.lastName,
        customerAddress: customer.address,
        fkCity: customer.fkCity.code
    }

    return redirectLink? <Redirect to={redirectLink}/>: (
        <Formik initialValues={initialVals}
                onSubmit = {
                    (values, {setSubmitting})=>{
                        
                        Axios.delete(`/customers/${customer.id}`)
                                .then(resp =>{
                                        console.log(resp)
                                        showModalAlert('success', 'block', 'Customer has been deleted')
                                        setTimeout(() => {
                                            closeModal()
                                            setRedirectLink('/customers')
                                        }, 500);
                                        setTimeout(() => {
                                            deleteCustomer(customer)
                                        }, 750);
                                        setSubmitting(false)
                                    }
                                )
                                .catch(err => {
                                    console.log(err)
                                    showModalAlert('danger', 'block', 'There was an error deleting customer')
                                    setSubmitting(false)
                                }
                        );
                    }
                }
        >
        {({values, handleSubmit, handleBlur, isSubmitting, setFieldValue})=>{
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
                                    autoComplete="off"
                                    disabled={true}
                                />
                            </InputGroup>
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
                                    disabled={true}
                                />
                            </InputGroup>
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
                                    disabled={true}
                                />
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
                                    disabled={true}
                                />
                                <InputGroup.Append>
                                    <select 
                                        id="fkCity" 
                                        className="form-control" 
                                        value={values.fkCity}
                                        name="fkCity"
                                        disabled={true}
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
                        </Form.Group>
                    
                    </Form.Row>

                    <Form.Row>
                        <Form.Group as={Col} md="6" className="mb-md-0 mb-lg-0 mb-s-5" controlId="validationSubmitForm">
                            <Button className="btn-block" disabled={isSubmitting} variant="danger" size="lg" type="submit">
                                {
                                    isSubmitting? <Spinner spinnerHeight="24px" spinnerFontSize="1.2em" spinnerRight="48%"/>: "Delete Customer"
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
    deleteCustomer: deleteCustomerAttempt
}
const mapStateToProps = createStructuredSelector({
    cities: selectCities,
    customers: selectCustomers,
    currentCustomer: selectCurrentCustomer,
    modalHeading: selectCustomerModalHeading
})

export default connect(mapStateToProps, mapDispatchToProps)(DeleteCustomerForm)
