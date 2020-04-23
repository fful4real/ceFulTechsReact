import React from 'react'
import { Form, Col, InputGroup, Button } from 'react-bootstrap'
import ModalComponent from '../../../../components/modal/modal-component'
import { useState } from 'react'
import OrderProcessingForm from './order-processing.form'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { selectUser } from '../../../../redux/user/user.selectors'
import OrderModificationForm from './order.modification.form'

const OrderItemForm = ({order, handleModal, selectUser})=> {
    const [showModal, setShowModal] = useState({show:false, formEl:'',modalHeading:''})

    const canProcess = order.status.statusCode==="ABN"||
            order.status.statusCode==="OK"?  false:true
    const handleProcessing = (formEl, modalHeading)=>{
        setShowModal({show:true,formEl, modalHeading})
    }
    const closeModal = ()=>{
        setShowModal(false)
    }

    return (
        <React.Fragment>
            <ModalComponent showModal={showModal.show} closeModal={closeModal} modalHeading={showModal.modalHeading}>
                {showModal.formEl==="Processing"&&<OrderProcessingForm order={order} closeModal={closeModal} />}
                {showModal.formEl==="Modifying"&&<OrderModificationForm order={order} closeModal={closeModal} />}
            </ModalComponent>
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
                                value={order.amountIn}
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
                                value={order.amountOut}
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
                                value={order.processedAmount}
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
                                value={order.pendingAmount}
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
                            onClick={()=>handleProcessing('Processing', 'Process Order')}
                        >
                            Process
                        </Button>
                    </Form.Group>
                    <Form.Group as={Col} md="3">
                        <Button className="btn-block btn-info" 
                            disabled={!canProcess}
                            size="lg"
                            type="button"
                            onClick={()=>handleProcessing('Modifying', 'Modify Order')}
                            
                        >
                            Modify
                        </Button>
                    </Form.Group>
                    <Form.Group as={Col} md="3">
                        <Button className="btn-block btn-warning" 
                            disabled={!canProcess} 
                            size="lg"
                            type="button"
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

const mapStateToProps = createStructuredSelector({
    selectUser
})

export default connect(mapStateToProps)(OrderItemForm)
