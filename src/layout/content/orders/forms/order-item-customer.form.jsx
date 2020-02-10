import React from 'react'
import { Form, Col, InputGroup, Button } from 'react-bootstrap'
import { capitalizeFirstLetter } from '../../../../helpers/helper'
import { isSubmitting } from 'redux-form'

const OrderItemCustomerForm = ({order})=> {
    const customerName = `${capitalizeFirstLetter(order.customer.firstName)} ${order.customer.lastName.toUpperCase()}`
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
                            <i className="icon-user text-info"></i>
                        </InputGroup.Text>
                        </InputGroup.Prepend>
                        <Form.Control 
                            name="customerName"
                            type="text"
                            value={customerName}
                            readOnly
                            className="text-muted"
                        />
                    </InputGroup>
                </Form.Group>

                <Form.Group as={Col} md="6" controlId="validationCustomerAddress">
                    <Form.Label>Address</Form.Label>
                    <InputGroup>
                        <InputGroup.Prepend>
                            <InputGroup.Text>
                            <i className="icon-location-pin text-info"></i>
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
                            <i className="zmdi zmdi-check text-danger"></i>
                        </InputGroup.Text>
                        </InputGroup.Prepend>
                        <Form.Control 
                            name="sentBy" 
                            type="text" 
                            value={order.sentBy===null? '':order.sentBy.firstName}
                            readOnly
                            className="text-muted text-capitalized"
                        />
                    </InputGroup>
                </Form.Group>
            </Form.Row>


            <Form.Row>
                <Form.Group as={Col} md="3">
                    <Button className="btn-block btn-success" disabled={true} variant="success" size="lg" type="submit">
                        View
                    </Button>
                </Form.Group>
                <Form.Group as={Col} md="3">
                    <Button className="btn-block btn-info" disabled={true} variant="info" size="lg" type="submit">
                        Modify
                    </Button>
                </Form.Group>
                <Form.Group as={Col} md="3">
                    <Button className="btn-block btn-warning" disabled={true} variant="warning" size="lg" type="submit">
                        Abandon
                    </Button>
                </Form.Group>
                <Form.Group as={Col} md="3">
                    <Button className="btn-block btn-danger" disabled={true} variant="danger" size="lg" type="submit">
                        Delete
                    </Button>
                </Form.Group>
            </Form.Row>
        </Form>
    )
}

export default OrderItemCustomerForm
