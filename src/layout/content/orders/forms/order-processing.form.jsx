import React, {useState} from 'react'
import { Container, Row, Button, Form, Col, InputGroup } from 'react-bootstrap';
import {Formik} from 'formik'
import * as Yup from 'yup'
import Spinner from '../../../../components/spinner/spinner';
import { connect } from 'react-redux';
import API_ROUTES from '../../../../api-route';
import AxiosAgent from '../../../../axios-agent';
import Alert from '../../../../components/alert/alert'
import {updateOrderAsync, fetchOrderItemLatestOrderEntryAsync } from '../../../../redux/orders/orders.actions'
import { selectAccounts } from '../../../../redux/accounts/accounts.selector';
import { selectOrders } from '../../../../redux/orders/orders.selectors';
import { createStructuredSelector } from 'reselect';
import { uid } from 'react-uid';
import { updateAccountAsync } from '../../../../redux/accounts/accounts.action';
import { sanitizeString, numberWithCommas } from '../../../../helpers/helper';

const OrderProcessingForm = ({order,closeModal,orders,updateOrderEntry, updateOrderAsync,updateAccountAsync, accounts})=>{
    const accountData = accounts.filter(account=>{ return (account.currency.currencyCode===order.currencyOut.currencyCode)&&parseInt(account.balance)>0});
    const [showSuccess, setShowSuccess] = useState({show:"hide", className:"success", message:"Order processed successfully"});
    // console.log(statuses)
    let initialVals = {
        customerNumber:order.customer.mobileNumber,
        pendingAmount:order.pendingAmount,
        processingAmount:order.pendingAmount,
        currencyIn:order.currencyIn.currencyCode,
        currencyOut: order.currencyOut.currencyCode,
        firstName:order.customer.firstName,
        lastName:order.customer.lastName,
        customerAddress:order.customer.address,
        fromAccount:'',
        orderId:order.id,
        orderNote:''

    }

    const validationSchema = Yup.object().shape({
        processingAmount:Yup.string()
                        .required('Please enter amount')
                        .matches(/^[0-9]+$/, 'Only Numbers accepted'),
        fromAccount:Yup.string()
                        .required('Please select account')
    });

    return (
        <Container>
            <Row>
                <Formik 
                    initialValues={initialVals} 
                    validationSchema={validationSchema}
                    onSubmit={
                        (values, {setSubmitting,setErrors, error, resetForm, setStatus, setFieldValue})=>{
                                if(values.processingAmount>values.pendingAmount){
                                    setErrors({processingAmount: 'Amount greated than pending amount'})
                                    return false
                                }
                                if(values.processingAmount<=1){
                                    setErrors({processingAmount: 'Amount must be greater than zero'})
                                    return false
                                }
                                const fromAccountVal = values.fromAccount.split("/")
                                if(parseInt(values.processingAmount)>parseInt(fromAccountVal[0])){
                                    console.log(fromAccountVal[0])
                                    setErrors({processingAmount: 'Amount greated than account balance'})
                                    return false
                                }
                                
                                const orderNote = sanitizeString(values.orderNote)
                                const processValues = {
                                    processAmount:values.processingAmount,
                                    fromAccount:fromAccountVal[1],
                                    orderNote
                                }
                                
                                AxiosAgent.request('put', API_ROUTES.orders(values.orderId), null, processValues)
                                        .then(resp=>{
                                            const orderResp = resp.data;
                                            console.log(resp.data)
                                            setStatus({success: false})
                                            const updatedOrder = {...order,
                                                    processedAmount:orderResp.processedAmount,
                                                    pendingAmount:orderResp.pendingAmount,
                                                    status:orderResp.status,
                                                }
                                            orders = orders.map(mapOrder=>mapOrder.id===updatedOrder.id?
                                                updatedOrder:
                                                mapOrder
                                                )
                                            accounts = accounts.map(mapAccount=>mapAccount.id===parseInt(fromAccountVal[1])?
                                                {...mapAccount,
                                                    balance:mapAccount.balance-parseInt(values.processingAmount)
                                                }:
                                                mapAccount
                                            )
                                            
                                            setShowSuccess({show:"show", className:"success", message:"Order processed successfully"})
                                            setSubmitting(false)

                                            updateOrderAsync(orders)
                                            updateAccountAsync(accounts)
                                            order.hasFetchedOrderEntries&&updateOrderEntry(updatedOrder)
                                            resetForm()
                                            setFieldValue('processingAmount',orderResp.pendingAmount)
                                            setFieldValue('pendingAmount',orderResp.pendingAmount )
                                            setTimeout(()=>{
                                                setShowSuccess({show:"hide", className:"success", message:"Order processed successfully"})
                                                orderResp.pendingAmount===0&&closeModal()
                                            },2000)
                                        })
                                        .catch(error=>{
                                            setSubmitting(false)
                                            setShowSuccess({show:"show", className:"danger", message:"Error Processing Order"})
                                            
                                            setTimeout(()=>{
                                                setShowSuccess({show:"hide", className:"success", message:"Order processed successfully"})
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
                        {showSuccess.show!=='hide'&&<Alert alertIcon='check-circle' alertText={showSuccess.message} alertType={showSuccess.className} show={showSuccess.show}/>}
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
                                    <Form.Label>Enter Amount</Form.Label>
                                    <InputGroup>
                                            <InputGroup.Prepend>
                                                <InputGroup.Text>
                                                <i className="icon-arrow-down-circle"></i>
                                            </InputGroup.Text>
                                            </InputGroup.Prepend>
                                            <Form.Control 
                                                name="processingAmount" 
                                                onChange={handleChange}
                                                type="text" 
                                                placeholder="Enter Amount"
                                                value={values.processingAmount}
                                                disabled={isSubmitting}
                                                onBlur={handleBlur}
                                                autoComplete="off"
                                            />
                                            <InputGroup.Append>
                                                <InputGroup.Text>
                                                    {values.currencyOut}
                                                </InputGroup.Text>
                                            </InputGroup.Append>
                                    </InputGroup>
                                    {touched.processingAmount&&errors.processingAmount&&
                                        <Form.Control.Feedback style={{display:'block'}} type='invalid'>
                                            {errors.processingAmount}
                                        </Form.Control.Feedback>
                                    }
                                </Form.Group>
                            
                                <Form.Group as={Col} md="4" controlId="validationAmountOut">
                                    <Form.Label>Pending Amount</Form.Label>
                                    <InputGroup>
                                            <InputGroup.Prepend>
                                                <InputGroup.Text>
                                                <i className="icon-arrow-up-circle"></i>
                                            </InputGroup.Text>
                                            </InputGroup.Prepend>
                                            <Form.Control 
                                                name="amountOut"
                                                type="text"
                                                value={values.pendingAmount}
                                                disabled={true}
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
                                        />
                                    </InputGroup>
                                </Form.Group>
                                
                                <Form.Group as={Col} controlId="validationFromAccount">
                                    <Form.Label>
                                        Select Account
                                    </Form.Label>
                                    <InputGroup>
                                        <InputGroup.Prepend>
                                            <InputGroup.Text>
                                            <i className="icon-wallet"></i>
                                            </InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <select 
                                            className="form-control" 
                                            onChange={handleChange} 
                                            name="fromAccount"
                                            disabled={isSubmitting}
                                            value={values.fromAccount}
                                        >
                                            <option value=''>Select account</option>
                                            {
                                                accountData
                                                .map(({code, balance, currency, id})=>(
                                                    <option key={`currency-${uid({id})}`} value={`${balance}/${id}`}>{`${code} - ${numberWithCommas(balance)} ${currency.currencyCode}`}</option>
                                                    ))
                                            }
                                        </select>
                                    </InputGroup>
                                    {touched.fromAccount&&errors.fromAccount&&
                                        <Form.Control.Feedback style={{display:'block'}} type='invalid'>
                                            {errors.fromAccount}
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
                                    <Button className="btn-block" disabled={isSubmitting} variant="success" size="lg" type="submit">
                                        {
                                            isSubmitting? <Spinner spinnerHeight="24px" spinnerFontSize="1.2em" spinnerRight="48%"/>: "Process"
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
    updateOrderAsync,
    updateAccountAsync,
    updateOrderEntry: fetchOrderItemLatestOrderEntryAsync
}

const mapStateToProps = createStructuredSelector({
    accounts:selectAccounts,
    orders: selectOrders
})

export default connect(mapStateToProps, mapDispatchToProps)(OrderProcessingForm)
