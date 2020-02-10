import React from 'react'
import { Form, Col, InputGroup, Button } from 'react-bootstrap'
import {Formik} from 'formik'
import * as Yup from 'yup'
import OrderModificationForm from './order-processing.form'

const OrderItemForm = ({order})=> {

    const [modify, setModify] = React.useState(false)
    const canProcess = order.status.statusCode==="ABN"||
            order.status.statusCode==="OK"?  false:true
    const [showModal, setShowModal] = React.useState(false)
    const hideModif = ()=>setShowModal(false)
    const handleProcessing = ()=>setShowModal(true)
    const handleFormSubmit = (values, {setSubmitting,setErrors, error, resetForm, setStatus})=>{
            if(values.submitButton==="processOrder"){
                setShowModal(true)
            }
        return
    }
    // console.log(order)
    let initialVals = {
        customerNumber:order.customer.mobileNumber,
        amountIn:order.amountIn,
        amountOut:order.amountOut,
        processedAmount:order.processedAmount,
        pendingAmount:order.pendingAmount,
        currencyIn:order.currencyIn.currencyCode,
        currencyOut: order.currencyOut.currencyCode,
        firstName:order.customer.firstName,
        lastName:order.customer.lastName,
        customerAddress:'',
        customerTown:'',
        submitButton:''

    }
    
    const validationSchema = Yup.object().shape({
        customerNumber: Yup.string()
                        .min(9,'Must have 9 characters')
                        .max(9,'Must not exceed 9 characters')
                        .required('Please enter number')
                        .matches(/^65|67|69|66|68/ , 'Invalid Cameroon number')
                        .matches(/^[0-9]+$/, 'Only Numbers accepted'),
            amountIn:Yup.string()
                        .required('Please enter amount')
                        .matches(/^[0-9]+$/, 'Only Numbers accepted'),
            amountOut:Yup.string()
                        .required('Please enter amount')
                        .matches(/^[0-9]+$/, 'Only Numbers accepted'),
            firstName:Yup.string()
                        .required('Enter First Name')
                        .max(255,'Must not exceed 255 characters'),
            customerAddress:Yup.string()
                        .required('Enter Address')
                        .max(255,'Must not exceed 255 characters')
    });

    return (
        <React.Fragment>
            <div className="card bg-light position-relative">
            <OrderModificationForm hideModif={hideModif} showModif={showModal} order={order} />
                <div className="card-header d-flex justify-content-between">
                    <h6>Order - {order.orderRef}</h6>
                    <div className="d-flex">
                        <span className={`badge badge-${order.status.className} text-capitalize`}>{order.status.statusLabel}</span>
                    </div>
                </div>
                <div className="card-body">
                    <Formik
                        initialValues={initialVals} 
                                onSubmit={handleFormSubmit}
                    >
                        {({values,submitForm, status, errors, touched, handleChange, handleSubmit, handleBlur, isSubmitting, setFieldValue})=>{
                                
                                return(
                                    
                                        <Form onSubmit={handleSubmit}>
                                            <Form.Row>
                                                <Form.Group as={Col} md="6" controlId="validationAmountIn">
                                                    <Form.Label>Amount In</Form.Label>
                                                    <InputGroup>
                                                        <InputGroup.Prepend>
                                                            <InputGroup.Text>
                                                            <i className="icon-arrow-down-circle text-success"></i>
                                                        </InputGroup.Text>
                                                        </InputGroup.Prepend>
                                                        <Form.Control 
                                                            name="amountIn" 
                                                            onChange={handleChange}
                                                            type="text" 
                                                            placeholder="Amount In"
                                                            value={values.amountIn}
                                                            disabled={!modify}
                                                            onBlur={handleBlur}
                                                        />
                                                    <InputGroup.Append>
                                                        <InputGroup.Text>
                                                        <span className="text-muted">{values.currencyIn}</span>
                                                        </InputGroup.Text>
                                                    </InputGroup.Append>
                                                    <Form.Control.Feedback type="invalid">
                                                        Wrror with amountOut
                                                    </Form.Control.Feedback>
                                                    </InputGroup>
                                                </Form.Group>

                                                <Form.Group as={Col} md="6" controlId="validationAmountOut">
                                                    <Form.Label>Amount Out</Form.Label>
                                                    <InputGroup>
                                                        <InputGroup.Prepend>
                                                            <InputGroup.Text>
                                                            <i className="icon-arrow-up-circle text-danger"></i>
                                                        </InputGroup.Text>
                                                        </InputGroup.Prepend>
                                                        <Form.Control 
                                                            name="amountOut" 
                                                            onChange={handleChange}
                                                            type="text" 
                                                            placeholder="Amount Out"
                                                            value={values.amountOut}
                                                            disabled={!modify}
                                                            onBlur={handleBlur}
                                                        />
                                                        <InputGroup.Append>
                                                            <InputGroup.Text>
                                                                <span className="text-muted">{values.currencyOut}</span>
                                                            </InputGroup.Text>
                                                        </InputGroup.Append>
                                                        <Form.Control.Feedback type="invalid">
                                                            Wrror with amountIn
                                                        </Form.Control.Feedback>
                                                    </InputGroup>
                                                </Form.Group>

                                                <Form.Group as={Col} md="6" controlId="validationProcessedAmount">
                                                    <Form.Label>Amount Processed</Form.Label>
                                                    <InputGroup>
                                                        <InputGroup.Prepend>
                                                            <InputGroup.Text>
                                                            <i className="zmdi zmdi-check text-info"></i>
                                                        </InputGroup.Text>
                                                        </InputGroup.Prepend>
                                                        <Form.Control 
                                                            name="amountOut" 
                                                            onChange={handleChange}
                                                            type="text" 
                                                            placeholder="Amount Processed"
                                                            value={values.processedAmount}
                                                            disabled={true}
                                                            onBlur={handleBlur}
                                                        />
                                                        <InputGroup.Append>
                                                            <InputGroup.Text>
                                                            <span className="text-muted">{values.currencyOut}</span>
                                                            </InputGroup.Text>
                                                        </InputGroup.Append>
                                                        <Form.Control.Feedback type="invalid">
                                                            Wrror with amountIn
                                                        </Form.Control.Feedback>
                                                    </InputGroup>
                                                </Form.Group>

                                                <Form.Group as={Col} md="6" controlId="validationPendingAmount">
                                                    <Form.Label>Amount Pending</Form.Label>
                                                    <InputGroup>
                                                        <InputGroup.Prepend>
                                                            <InputGroup.Text>
                                                            <i className="zmdi zmdi-check text-danger"></i>
                                                        </InputGroup.Text>
                                                        </InputGroup.Prepend>
                                                        <Form.Control 
                                                            name="pendingAmount" 
                                                            onChange={handleChange}
                                                            type="text" 
                                                            placeholder="Amount Pending"
                                                            value={values.pendingAmount}
                                                            disabled={true}
                                                            onBlur={handleBlur}
                                                        />
                                                        <InputGroup.Append>
                                                            <InputGroup.Text>
                                                            <span className="text-muted">{values.currencyOut}</span>
                                                            </InputGroup.Text>
                                                        </InputGroup.Append>
                                                        <Form.Control.Feedback type="invalid">
                                                            Wrror with amountIn
                                                        </Form.Control.Feedback>
                                                    </InputGroup>
                                                </Form.Group>
                                            </Form.Row>


                                            <Form.Row>
                                                <Form.Group as={Col} md="3">
                                                    <Button className="btn-block btn-success" 
                                                        disabled={isSubmitting||!canProcess} 
                                                        size="lg"
                                                        type="button"
                                                        onClick={handleProcessing}
                                                    >
                                                        Process
                                                    </Button>
                                                </Form.Group>
                                                <Form.Group as={Col} md="3">
                                                    <Button className="btn-block btn-info" 
                                                        disabled={isSubmitting||!canProcess} 
                                                        size="lg"
                                                        type="button"
                                                        onClick={(e)=> {
                                                                setFieldValue('submitButton','modifyOrder')
                                                                return submitForm(e)
                                                            }
                                                        }
                                                    >
                                                        {
                                                            modify?"Save":"Modify"
                                                        }
                                                    </Button>
                                                </Form.Group>
                                                <Form.Group as={Col} md="3">
                                                    <Button className="btn-block btn-warning" 
                                                        disabled={isSubmitting} 
                                                        size="lg"
                                                        type="button"
                                                        onClick={(e)=> {
                                                                setFieldValue('submitButton','abandonOrder')
                                                                return submitForm(e)
                                                            }
                                                        }
                                                    >
                                                        Abandon
                                                    </Button>
                                                </Form.Group>
                                                <Form.Group as={Col} md="3">
                                                    <Button className="btn-block btn-danger" 
                                                        disabled={false} 
                                                        size="lg"
                                                        type="button"
                                                        name="deleteOrder"
                                                        onClick={(e)=> {
                                                                setFieldValue('submitButton','deleteOrder')
                                                                return submitForm(e)
                                                            }
                                                        }
                                                    >
                                                        Delete
                                                    </Button>
                                                </Form.Group>
                                            </Form.Row>
                                        </Form>
                    
                                )
                            }

                        }
                    </Formik>
        
                </div>
            </div>
        </React.Fragment>
        
       )
}

export default OrderItemForm
