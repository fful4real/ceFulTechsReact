import React, {useState} from 'react'
import { Container, Row, Button, Form, Col, InputGroup } from 'react-bootstrap';
import {Formik} from 'formik'
import * as Yup from 'yup'
import Spinner from '../../../../components/spinner/spinner';
import { connect } from 'react-redux';
import API_ROUTES from '../../../../api-route';
import AxiosAgent from '../../../../axios-agent';
import Alert from '../../../../components/alert/alert'
import {updateOrderAsync } from '../../../../redux/orders/orders.actions'
import { selectOrders, selectOrderModalObject } from '../../../../redux/orders/orders.selectors';
import { createStructuredSelector } from 'reselect';
import { sanitizeString } from '../../../../helpers/helper';

const OrderModificationForm = ({order,orders, updateOrders, closeModal})=>{
    const [showSuccess, setShowSuccess] = useState({show:"hide",alertIcon:"check-circle", className:"success", message:"Order processed successfully"});
    order = order.data
    let initialVals = {
        customerNumber:order.customer.mobileNumber,
        amountOut:order.amountOut,
        amountIn:order.amountIn,
        currencyIn:order.currencyIn.currencyCode,
        currencyOut: order.currencyOut.currencyCode,
        firstName:order.customer.firstName,
        lastName:order.customer.lastName,
        processedAmount:order.processedAmount,
        orderRef:order.orderRef,
        orderId:order.id,
        orderNote:order.note,
        pendingAmount:order.pendingAmount

    }

    const validationSchema = Yup.object().shape({
        amountIn:Yup.string()
                        .required('Please enter amount')
                        .matches(/^[0-9]+$/, 'Only Numbers accepted'),
        amountOut:Yup.string()
                        .required('Please enter amount')
                        .matches(/^[0-9]+$/, 'Only Numbers accepted')
    });

    return (
        <Container>
            <Row>
                <Formik 
                    initialValues={initialVals} 
                    validationSchema={validationSchema}
                    onSubmit={
                        (values, {setSubmitting,setErrors, error, resetForm, setStatus, setFieldValue})=>{
                                if(parseInt(values.amountIn)>parseInt(values.amountOut)){
                                    setErrors({amountIn: 'Amount greated than amount out'})
                                    return false
                                }
                                if(values.amountIn<=1){
                                    setErrors({amountIn: 'Amount must be greater than zero'})
                                    return false
                                }
                                if (parseInt(values.amountOut)<parseInt(values.processedAmount)) {
                                    setErrors({amountOut:'Amount out less than processed amount'})
                                    return false
                                }
                                
                                const note = sanitizeString(values.orderNote)
                                const pendingAmount = parseInt(values.amountOut)-parseInt(values.processedAmount)
                                const processValues = {
                                    amountIn:parseInt(values.amountIn),
                                    amountOut:parseInt(values.amountOut),
                                    note,
                                    pendingAmount
                                }
                                
                                AxiosAgent.request('patch', API_ROUTES.orders(values.orderId), null, processValues)
                                        .then(resp=>{
                                            const orderResp = resp.data;
                                            console.log(resp.data)
                                            setStatus({success: false})
                                            
                                            orders = orders.map(mapOrder=>mapOrder.id===orderResp.id?
                                                orderResp:
                                                mapOrder
                                                )

                                            setSubmitting(false)
                                            setShowSuccess({...showSuccess, show:"show", className:"success",alertIcon:"check-circle", message:"Order processed successfully"})
                                            resetForm()
                                            updateOrders(orders)
                                            setFieldValue('amountIn',orderResp.amountIn)
                                            setFieldValue('amountOut',orderResp.amountOut )
                                            setFieldValue('orderNote',orderResp.note )
                                            
                                            setTimeout(()=>{
                                                setShowSuccess({show:"hide",alertIcon:"block", className:"success", message:"Order processed successfully"})
                                            },2000)
                                        })
                                        .catch(error=>{
                                            setSubmitting(false)
                                            setShowSuccess({...showSuccess, show:"show", className:"danger",alertIcon:"block", message:"Error Processing Order"})
                                            
                                            setTimeout(()=>{
                                                setShowSuccess({show:"hide",alertIcon:"block", className:"success", message:"Order processed successfully"})
                                            },2000)
                                            console.error(error.message)
                                        })
                            return
                        }
                    }
                >
                    {({values, status, errors, touched, handleChange, handleSubmit, handleBlur, isSubmitting, setFieldValue})=>{
                        
                    
                        return (
                        <Form 
                            onSubmit={handleSubmit}
                        >
                        {showSuccess.show!=='hide'&&<Alert alertIcon={showSuccess.alertIcon} alertText={showSuccess.message} alertType={showSuccess.className} show={showSuccess.show}/>}
                            <Form.Row>
                                <Form.Group as={Col} md="4" controlId="validationCustomerNumber">
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
                                        disabled={true}
                                    />
                                    </InputGroup>
                                </Form.Group>
                                <Form.Group as={Col} md="4" controlId="validationProcessingAmount">
                                    <Form.Label>Amount In</Form.Label>
                                    <InputGroup>
                                            <InputGroup.Prepend>
                                                <InputGroup.Text>
                                                <i className="icon-arrow-down-circle"></i>
                                            </InputGroup.Text>
                                            </InputGroup.Prepend>
                                            <Form.Control 
                                                name="amountIn" 
                                                onChange={handleChange}
                                                type="text" 
                                                placeholder="Enter In"
                                                value={values.amountIn}
                                                disabled={isSubmitting}
                                                onBlur={handleBlur}
                                                autoComplete="off"
                                            />
                                            <InputGroup.Append>
                                                <InputGroup.Text>
                                                    {values.currencyIn}
                                                </InputGroup.Text>
                                            </InputGroup.Append>
                                    </InputGroup>
                                    {touched.amountIn&&errors.amountIn&&
                                        <Form.Control.Feedback style={{display:'block'}} type='invalid'>
                                            {errors.amountIn}
                                        </Form.Control.Feedback>
                                    }
                                </Form.Group>
                            
                                <Form.Group as={Col} md="4" controlId="validationAmountOut">
                                    <Form.Label>Amount Out</Form.Label>
                                    <InputGroup>
                                            <InputGroup.Prepend>
                                                <InputGroup.Text>
                                                <i className="icon-arrow-up-circle"></i>
                                            </InputGroup.Text>
                                            </InputGroup.Prepend>
                                            <Form.Control 
                                                name="amountOut"
                                                type="text"
                                                value={values.amountOut}
                                                disabled={isSubmitting}
                                                onChange={handleChange}
                                            />
                                            <InputGroup.Append>
                                            <InputGroup.Append>
                                                <InputGroup.Text>
                                                    {values.currencyOut}
                                                </InputGroup.Text>
                                            </InputGroup.Append>
                                            </InputGroup.Append>
                                    </InputGroup>
                                    {touched.amountOut&&errors.amountOut&&
                                        <Form.Control.Feedback style={{display:'block'}} type='invalid'>
                                            {errors.amountOut}
                                        </Form.Control.Feedback>
                                    }
                                </Form.Group>
                            
                            </Form.Row>


                            <Form.Row  className="mb-lg-15 mb-md-10 mb-sm-5">
                                <Form.Group as={Col} controlId="validationCustomerName">
                                    <Form.Label>
                                        Customer Names
                                    </Form.Label>
                                    <InputGroup>
                                        <InputGroup.Prepend>
                                            <InputGroup.Text>
                                            <i className="icon-user"></i>
                                            </InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <Form.Control 
                                            name="firstName" 
                                            value={`${values.firstName} ${values.lastName}`} 
                                            type="text" 
                                            disabled={true}
                                            onChange={handleBlur}
                                        />
                                    </InputGroup>
                                </Form.Group>
                                
                                <Form.Group as={Col} controlId="validationOrderRef">
                                    <Form.Label>
                                        OrderRef
                                    </Form.Label>
                                    <InputGroup>
                                        <InputGroup.Prepend>
                                            <InputGroup.Text>
                                                <i className="icon-wallet"></i>
                                            </InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <Form.Control 
                                            name="orderRef" 
                                            value={values.orderRef} 
                                            type="text" 
                                            disabled={true}
                                        />
                                    </InputGroup>
                                    {touched.orderRef&&errors.orderRef&&
                                        <Form.Control.Feedback style={{display:'block'}} type='invalid'>
                                            {errors.orderRef}
                                        </Form.Control.Feedback>
                                    }
                                </Form.Group>
                            
                            </Form.Row>

                            
                            <Form.Row className="mb-25">
                        <Form.Group as={Col} controlId="validationOrderNote">
                            <Form.Label>Note</Form.Label>
                            <InputGroup>
                                <InputGroup.Prepend>
                                    <InputGroup.Text>
                                    <i className="icon-notebook"></i>
                                </InputGroup.Text>
                                </InputGroup.Prepend>
                                <Form.Control 
                                    as="textarea" 
                                    rows="3"
                                    name="orderNote"
                                    value={values.orderNote}
                                    onBlur={handleBlur}
                                    disabled={isSubmitting}
                                    onChange={handleChange} 
                                />
                            </InputGroup>
                        </Form.Group>
                    </Form.Row>
                    
                    <Form.Row>
                        <Form.Group as={Col} md="6" className="mb-0" controlId="validationSubmitForm">
                            <Button className="btn-block" disabled={isSubmitting} variant="info" size="lg" type="submit">
                                {
                                    isSubmitting? <Spinner spinnerHeight="24px" spinnerFontSize="1.2em" spinnerRight="48%"/>: "Modify"
                                }
                            </Button>
                        </Form.Group>
                        <Form.Group as={Col} md="6" className="mb-0" controlId="validationCancel">
                            <Button className="btn-block" onClick={closeModal} disabled={isSubmitting} variant="secondary" size="lg" type="button">
                                Close
                            </Button>
                        </Form.Group>
                    </Form.Row>
                        </Form>
                    )}}
                </Formik>
            </Row>
          </Container>
    )
}

const mapDispatchToProps = {
    updateOrders:updateOrderAsync
}

const mapStateToProps = createStructuredSelector({
    orders: selectOrders,
    order: selectOrderModalObject
})

export default connect(mapStateToProps, mapDispatchToProps)(OrderModificationForm)
