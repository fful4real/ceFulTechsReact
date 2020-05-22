import React from 'react'
import { Form, Col, InputGroup, Button } from 'react-bootstrap'
import { connect } from 'react-redux'
import { numberWithCommas, capitalizeFirstLetter } from '../../../../helpers/helper'
import { setShowOrdersModalAttempt, setOrdersModalbodyAttempt, setOrdersModalHeadingAttempt, setOrdersModalDataAttempt } from '../../../../redux/orders/orders.actions'

const OrderItemForm = ({order, setModalbody, setModalHeading, setModalData, showModal})=> {

    const canProcess = order.status.statusCode==="ABN"||
            order.status.statusCode==="OK"?  false:true
    
    const handleModal = (modal)=>{
        setModalbody(modal)
        setModalHeading(`${capitalizeFirstLetter(modal)} Order`)
        setModalData(order)
        showModal(true)
    }

    return (
        <React.Fragment>
            <Form>
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
                                type="text" 
                                placeholder="Amount In"
                                value={numberWithCommas(order.amountIn)}
                                disabled={true}
                            />
                        <InputGroup.Append>
                            <InputGroup.Text>
                            <span className="text-muted">{order.currencyIn.currencyCode}</span>
                            </InputGroup.Text>
                        </InputGroup.Append>
                        <Form.Control.Feedback type="invalid">
                            Error with amountOut
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
                                type="text" 
                                placeholder="Amount Out"
                                value={numberWithCommas(order.amountOut)}
                                disabled={true}
                            />
                            <InputGroup.Append>
                                <InputGroup.Text>
                                    <span className="text-muted">{order.currencyOut.currencyCode}</span>
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
                                type="text" 
                                placeholder="Amount Processed"
                                value={numberWithCommas(order.processedAmount)}
                                disabled={true}
                            />
                            <InputGroup.Append>
                                <InputGroup.Text>
                                <span className="text-muted">{order.currencyOut.currencyCode}</span>
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
                                type="text" 
                                placeholder="Amount Pending"
                                value={numberWithCommas(order.pendingAmount)}
                                disabled={true}
                            />
                            <InputGroup.Append>
                                <InputGroup.Text>
                                <span className="text-muted">{order.currencyOut.currencyCode}</span>
                                </InputGroup.Text>
                            </InputGroup.Append>
                            <Form.Control.Feedback type="invalid">
                                Error with amountIn
                            </Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>
                </Form.Row>


                <Form.Row>
                    <Form.Group as={Col} md="3">
                        <Button className="btn-block btn-success" 
                            disabled={!canProcess} 
                            size="lg"
                            type="button"
                            onClick={()=>handleModal('process')}
                        >
                            Process
                        </Button>
                    </Form.Group>
                    <Form.Group as={Col} md="3">
                        <Button className="btn-block btn-info" 
                            disabled={!canProcess}
                            size="lg"
                            type="button"
                            onClick={()=>handleModal('modify')}
                            
                        >
                            Modify
                        </Button>
                    </Form.Group>
                    <Form.Group as={Col} md="3">
                        <Button className="btn-block btn-warning" 
                            disabled={!canProcess} 
                            size="lg"
                            type="button"
                            onClick={()=>handleModal('abandon')}
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
                        >
                            Delete
                        </Button>
                    </Form.Group>
                </Form.Row>
            </Form>  
        </React.Fragment>)
}

const mapDispatchToProps = {
    showModal: setShowOrdersModalAttempt,
    setModalbody: setOrdersModalbodyAttempt,
    setModalHeading: setOrdersModalHeadingAttempt,
    setModalData: setOrdersModalDataAttempt
}

export default connect(null,mapDispatchToProps)(OrderItemForm)
