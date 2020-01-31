import React from 'react'
import { Container, Row, Button, Form, Col, InputGroup } from 'react-bootstrap';

const CreateOrderForm = ()=>{

    return (
        <Container>
            <Row>
                <Form>
                    <Form.Row>
                        <Form.Group as={Col} md="4" controlId="validationPhoneNumber">
                        <Form.Label>Phone Number</Form.Label>
                        <InputGroup>
                            <InputGroup.Prepend>
                                <InputGroup.Text>
                                <i className="icon-phone"></i>
                                </InputGroup.Text>
                            </InputGroup.Prepend>
                            <Form.Control 
                                type="text" 
                                placeholder="Phone Number"
                                required
                                aria-describedby="inputGroupPrepend"
                                name="customerNumber"
                            />
                            <Form.Control.Feedback type="invalid">
                                Please provide valid Cameroon number.
                            </Form.Control.Feedback>
                          </InputGroup>
                        </Form.Group>
                        <Form.Group as={Col} md="4" controlId="validationAmountIn">
                            <Form.Label>Amount In</Form.Label>
                            <InputGroup>
                                    <InputGroup.Prepend>
                                        <InputGroup.Text>
                                        <i className="icon-arrow-down-circle"></i>
                                    </InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <Form.Control name="amountIn" required type="text" placeholder="Amount In"/>
                                    <InputGroup.Append>
                                    <InputGroup.Append>
                                        <select className="form-control" id="amountInCurrency" name="currencyIn">
                                            <option>XAF</option>
                                            <option>AED</option>
                                        </select>
                                    </InputGroup.Append>
                                    </InputGroup.Append>
                            </InputGroup>
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Form.Group>
                       
                        <Form.Group as={Col} md="4" controlId="validationAmountOut">
                            <Form.Label>Amount Out</Form.Label>
                            <InputGroup>
                                    <InputGroup.Prepend>
                                        <InputGroup.Text>
                                        <i className="icon-arrow-up-circle"></i>
                                    </InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <Form.Control name="amountOut" required type="text" placeholder="Amount Out"/>
                                    <InputGroup.Append>
                                    <InputGroup.Append>
                                        <select className="form-control" id="amountOutCurrency" name="currencyOut">
                                            <option>XAF</option>
                                            <option>AED</option>
                                        </select>
                                    </InputGroup.Append>
                                    </InputGroup.Append>
                            </InputGroup>
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Form.Group>
                       
                    </Form.Row>
                    
                    
                    <Form.Row  className="mb-lg-15 mb-md-10 mb-sm-5">
                        <Form.Group as={Col} controlId="validationFirstName">
                          <Form.Label>
                              First Name
                          </Form.Label>
                          <InputGroup>
                            <InputGroup.Prepend>
                                <InputGroup.Text>
                                <i className="icon-user"></i>
                                </InputGroup.Text>
                            </InputGroup.Prepend>
                            <Form.Control name="firstName" required type="text" placeholder="First Name"/>
                            <Form.Control.Feedback type="invalid">
                                Please enter a name for the customer.
                            </Form.Control.Feedback>
                          </InputGroup>
                        </Form.Group>
                            
                        <Form.Group as={Col} controlId="validateionLastName">
                            <Form.Label>Last Name</Form.Label>
                            <InputGroup>
                                <InputGroup.Prepend>
                                    <InputGroup.Text>
                                    <i className="icon-user"></i>
                                </InputGroup.Text>
                                </InputGroup.Prepend>
                                <Form.Control name="lastName" type="text" placeholder="Last Name"/>
                            </InputGroup>
                        </Form.Group>
                    </Form.Row>

                    
                    <Form.Row className="mb-25">
                        <Form.Group as={Col} controlId="validationAddress">
                            <Form.Label>Address</Form.Label>
                            <InputGroup>
                                <InputGroup.Prepend>
                                    <InputGroup.Text>
                                    <i className="icon-location-pin"></i>
                                </InputGroup.Text>
                                </InputGroup.Prepend>
                                <Form.Control name="customerAddress" required type="text" placeholder="Address"/>
                                <InputGroup.Append>
                                    <select id="customerTown" className="form-control" name="customerTown">
                                        <option title="Douala">DLA</option>
                                        <option title="Yaounde">YDE</option>
                                        <option title="Bamenda">BDA</option>
                                        <option title="Buea">BUE</option>
                                        <option title="Bafoussam">BAF</option>
                                        <option title="Kumba">KBA</option>
                                        <option title="Limbe">LBE</option>
                                    </select>
                                </InputGroup.Append>
                            </InputGroup>
                        </Form.Group>
                    </Form.Row>

                    <Button className="btn-block" variant="success" size="lg" type="submit">
                        Create
                    </Button>
                </Form>    
            </Row>
          </Container>
    )
}

export default CreateOrderForm
