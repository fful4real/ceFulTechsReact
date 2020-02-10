import React from 'react'
import {Formik} from 'formik'
import * as Yup from 'yup'
import OrderModificationStyle from './css/order-modification.styles'
import { Form, InputGroup, Col, Button } from 'react-bootstrap'
import { createStructuredSelector } from 'reselect'
import { selectAccounts } from '../../../../redux/accounts/accounts.selector'
import { connect } from 'react-redux'
import { uid } from 'react-uid'
import AxiosAgent from '../../../../axios-agent'
import API_ROUTES from '../../../../api-route'
import Alert from '../../../../components/alert/alert'
import { updateOrderAsync } from '../../../../redux/orders/orders.actions'
import { selectOrders } from '../../../../redux/orders/orders.selectors'
// account.currency.currencyCode
const  OrderModificationForm = ({order,orders,updateOrderAsync,showModif,hideModif,accounts})=> {
    const accountData = accounts.filter(account=>{ return account.currency.currencyCode===order.currencyOut.currencyCode});
    // console.log("Accounts: ",accounts)
    // console.log("AccountData: ",accountData)
    // console.log("Order: ",order)
    const [showSuccess, setShowSuccess] = React.useState('hide')
    const canProcess = order.status.statusCode==="ABN"||
            order.status.statusCode==="OK"?  false:true

    const handleFormSubmit = (values, {setSubmitting,setErrors, error, resetForm, setStatus})=>{
        if(parseInt(values.processAmount)>parseInt(values.pendingAmount)){
            setErrors({processAmount: 'Amount too high'})
            return false
        }
        
        if(parseInt(values.fromAccount.split("/")[0])<parseInt(values.processAmount)){
            setErrors({'processAmount':'Amount higher than account'})
            return false
        }
        const processValues = {
            processAmount:values.processAmount,
            fromAccount:values.fromAccount.split("/")[1]
        }
        
        AxiosAgent.request('put', API_ROUTES.orders(values.orderId), null, processValues)
                .then(resp=>{
                    // console.log(resp.data)
                    setStatus({success: false})
                    orders = orders.map(mapOrder=>mapOrder.id===order.id?
                            {...mapOrder,
                                processedAmount:order.processedAmount + parseInt(values.processAmount),
                                pendingAmount:order.pendingAmount - parseInt(values.processAmount)
                            }:
                        mapOrder
                        )
                    updateOrderAsync(orders)
                    setShowSuccess('show')
                    setSubmitting(false)
                    resetForm()
                    setTimeout(()=>{
                        setShowSuccess('hide')
                    },2000)
                })
                .catch(error=>{

                    console.error(error.message)
                })

        return
    }
    const initialVals = {
        processedAmount:order.processedAmount,
        processAmount:order.pendingAmount,
        pendingAmount:order.pendingAmount,
        currencyIn:order.currencyIn.currencyCode,
        currencyOut:order.currencyOut.currencyCode,
        fromAccount:'',
        orderId:order.id
    }
    
    const validationSchema = Yup.object().shape({
            processAmount:Yup.string()
                        .required('Please enter amount')
                        .matches(/^[0-9]+$/, 'Only Numbers accepted'),
            fromAccount: Yup.string()
                        .required()
                        .min(2,'Please select account')
    });
    return (
    <div style={{display:showModif?"block":"none"}}>
        <OrderModificationStyle>
                <div className="card">
        {showSuccess!=='hide'&&<Alert alertText="Order processsed" alertIcon='check-circle' show={showSuccess}/>}
                    <div className="card-header d-flex justify-content-between">
                        <h6>Process order</h6>
                    </div>
                    <div className="card-body">
                        <Formik
                            initialValues={initialVals} 
                            onSubmit={handleFormSubmit}
                            validationSchema={validationSchema}
                        >
                        {
                            ({values,submitForm, status, errors, touched, handleChange, handleSubmit, handleBlur, isSubmitting, setFieldValue})=>{

                                return (
                                    
                                        
                                    <Form onSubmit={handleSubmit}>
                                                <Form.Row>
                                                    <Form.Group as={Col} md="6" controlId="validationModifProcessedAmount">
                                                        <Form.Label>Enter Amount</Form.Label>
                                                        <InputGroup>
                                                            <InputGroup.Prepend>
                                                                <InputGroup.Text>
                                                                <i className="icon-arrow-up-circle text-danger"></i>
                                                            </InputGroup.Text>
                                                            </InputGroup.Prepend>
                                                            <Form.Control 
                                                                name="processAmount" 
                                                                onChange={handleChange}
                                                                type="text" 
                                                                placeholder="Enter amount"
                                                                value={values.processAmount}
                                                                disabled={isSubmitting}
                                                                onBlur={handleBlur}
                                                            />
                                                        <InputGroup.Append>
                                                            <InputGroup.Text>
                                                            <span className="text-muted">{order.currencyIn.currencyCode}</span>
                                                            </InputGroup.Text>
                                                        </InputGroup.Append>
                                                        {touched.processAmount&&errors.processAmount&&
                                                            <Form.Control.Feedback type="invalid" style={{display:'block'}}>
                                                                {errors.processAmount}
                                                            </Form.Control.Feedback>
                                                        }
                                                        </InputGroup>
                                                    </Form.Group>

                                                    <Form.Group as={Col} md="6" controlId="validationModifPendingAmount">
                                                        <Form.Label>Amount Pending</Form.Label>
                                                        <InputGroup>
                                                            <InputGroup.Prepend>
                                                                <InputGroup.Text>
                                                                <i className="icon-arrow-up-circle text-danger"></i>
                                                            </InputGroup.Text>
                                                            </InputGroup.Prepend>
                                                            <Form.Control 
                                                                name="pendingAmount"
                                                                type="text" 
                                                                value={order.pendingAmount}
                                                                readOnly
                                                                className="text-grey"
                                                            />
                                                            <InputGroup.Append>
                                                                <InputGroup.Text>
                                                                <span className="text-muted">{order.currencyOut.currencyCode}</span>
                                                                </InputGroup.Text>
                                                            </InputGroup.Append>
                                                        </InputGroup>
                                                    </Form.Group>

                                                    <Form.Group as={Col} md="12" controlId="validationFromAccount">
                                                        <InputGroup>
                                                            <InputGroup.Prepend>
                                                                <InputGroup.Text>
                                                                    <span className="text-muted">From Account: </span>
                                                                </InputGroup.Text>
                                                            </InputGroup.Prepend>
                                                            <select 
                                                                className="form-control" 
                                                                onChange={handleChange} 
                                                                id="fromAccount" 
                                                                name="fromAccount"
                                                                disabled={isSubmitting}
                                                                value={values.fromAccount}
                                                            >
                                                                <option value=''>Select account</option>
                                                                {
                                                                    accountData
                                                                    .map(({code, balance, currency, id})=>(
                                                                        <option key={`currency-${uid({id})}`} value={`${balance}/${id}`}>{`${code} - ${balance} ${currency.currencyCode}`}</option>
                                                                        ))
                                                                }
                                                            </select>
                                                            {errors.fromAccount&&
                                                                <Form.Control.Feedback type="invalid" style={{display:'block'}}>
                                                                    {errors.fromAccount}
                                                                </Form.Control.Feedback>
                                                            }
                                                        </InputGroup>
                                                    </Form.Group>

                                                </Form.Row>

                                                <Form.Row>
                                                    <Form.Group as={Col} md="6">
                                                        <Button className="btn-block btn-success" 
                                                            disabled={isSubmitting&&!canProcess} 
                                                            size="lg"
                                                            type="submit"
                                                        >
                                                            Save
                                                        </Button>
                                                    </Form.Group>
                                                    <Form.Group as={Col} md="6">
                                                        <Button className="btn-block btn-danger" 
                                                            disabled={false} 
                                                            size="lg"
                                                            type="button"
                                                            onClick={(e)=> {hideModif()}
                                                            }
                                                        >
                                                            Cancel
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
        
        </OrderModificationStyle>
    </div>
    )
}

const mapDispatchToProps = {
    updateOrderAsync
  }

const selectStates = createStructuredSelector({
    accounts:selectAccounts,
    orders: selectOrders
})

export default connect(selectStates,mapDispatchToProps) (OrderModificationForm)
