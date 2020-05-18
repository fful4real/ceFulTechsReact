import React from 'react'
import { Form, Col, InputGroup, Button } from 'react-bootstrap'
import { capitalizeFirstLetter } from '../../../../helpers/helper'
import { useHistory } from 'react-router-dom'

const OrderItemCustomerForm = ({order})=> {
    const history = useHistory()
    const handleCustomerLink = customerId =>{
        history.push(`/customers/${customerId}`);
    }
    const customerName = `${capitalizeFirstLetter(order.customer.firstName)} ${order.customer.lastName.toUpperCase()}`
    // console.log("Order - OrderItemCustomerForm: ", order)
    return (
        <Form>
            <Form.Row>
                <Form.Group as={Col} md="6" controlId="validationCustomerNumber">
                    <Form.Label>Number</Form.Label>
                    <InputGroup>
                        <InputGroup.Prepend>
                            <InputGroup.Text>
                            <i className="icon-phone"></i>
                        </InputGroup.Text>
                        </InputGroup.Prepend>
                        <Form.Control 
                            name="customerNumber" 
                            type="text"
                            value={order.customer.mobileNumber}
                            readOnly
                            className="text-muted"
                        />
                    </InputGroup>
                </Form.Group>

                <Form.Group as={Col} md="6" controlId="validationCustomerName">
                    <Form.Label>Names</Form.Label>
                    <InputGroup>
                        <InputGroup.Prepend>
                            <InputGroup.Text>
                            <i className="icon-user"></i>
                        </InputGroup.Text>
                        </InputGroup.Prepend>
                        <Form.Control 
                            name="customerName"
                            type="text"
                            value={customerName}
                            readOnly
                            className="text-muted cursor-pointer"
                            onClick={()=>handleCustomerLink(order.customer.id)}
                        />
                    </InputGroup>
                </Form.Group>

                <Form.Group as={Col} md="6" controlId="validationCustomerAddress">
                    <Form.Label>Address</Form.Label>
                    <InputGroup>
                        <InputGroup.Prepend>
                            <InputGroup.Text>
                            <i className="icon-location-pin"></i>
                        </InputGroup.Text>
                        </InputGroup.Prepend>
                        <Form.Control 
                            name="customerAddress"
                            type="text" 
                            value={order.customer.address}
                            readOnly
                            className="text-muted"
                        />
                        <InputGroup.Append>
                            <InputGroup.Text>
                            <span className="text-muted">{order.customer.fkCity.code}</span>
                            </InputGroup.Text>
                        </InputGroup.Append>
                    </InputGroup>
                </Form.Group>

                <Form.Group as={Col} md="6" controlId="validationSentBy">
                    <Form.Label>Senti By</Form.Label>
                    <InputGroup>
                        <InputGroup.Prepend>
                            <InputGroup.Text>
                            <i className="icon-user"></i>
                        </InputGroup.Text>
                        </InputGroup.Prepend>
                        <Form.Control 
                            name="sentBy" 
                            type="text" 
                            value={order.sentBy&&order.sentBy.firstName}
                            onClick={()=>{order.sentBy&&handleCustomerLink(order.sentBy.id)}}
                            readOnly
                            className="text-muted text-capitalized cursor-pointer"
                        />
                    </InputGroup>
                </Form.Group>
            </Form.Row>


            <Form.Row>
                <Form.Group as={Col}>
                    <Button className="btn-block" onClick={()=>handleCustomerLink(order.customer.id)} disabled={false} variant="info" size="lg" type="submit">
                        View Customer
                    </Button>
                </Form.Group>
            </Form.Row>
        </Form>
    )
}

export default OrderItemCustomerForm