import React from 'react'
import { Container, Row, Button, Form, Col, InputGroup } from 'react-bootstrap';


const CreateOrderForm = ()=> {

    const [validated, setValidated] = React.useState(false);

  const handleSubmit = event => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };


    return (
        <Container>
            <Row>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Form.Row className="mb-lg-15 mb-md-10 mb-sm-5">
                        <Form.Group as={Col} controlId="validationPhoneNumber">
                          <Form.Label>
                              Phone Number
                          </Form.Label>
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
                            />
                            <Form.Control.Feedback type="invalid">
                                Please provide valid Cameroon number.
                            </Form.Control.Feedback>
                          </InputGroup>
                        </Form.Group>
                            
                        <Form.Group as={Col} controlId="validationAmountIn">
                            <Form.Label>Amount In</Form.Label>
                            <InputGroup>
                                <InputGroup.Prepend>
                                    <InputGroup.Text>
                                    <i className="icon-arrow-down-circle"></i>
                                </InputGroup.Text>
                                </InputGroup.Prepend>
                                <Form.Control required type="text" placeholder="Amount In"/>
                                <InputGroup.Append>
                                    <Form.Control as="select">
                                        <option>XAF</option>
                                        <option>AED</option>
                                    </Form.Control>
                                </InputGroup.Append>
                            </InputGroup>
                        </Form.Group>
                            
                        <Form.Group as={Col} controlId="validationAmountOut">
                            <Form.Label>Amount Out</Form.Label>
                            <InputGroup>
                                <InputGroup.Prepend>
                                    <InputGroup.Text>
                                    <i className="icon-arrow-up-circle"></i>
                                </InputGroup.Text>
                                </InputGroup.Prepend>
                                <Form.Control required type="text" placeholder="Amount Out"/>
                                <InputGroup.Append>
                                    <Form.Control as="select">
                                        <option>XAF</option>
                                        <option>AED</option>
                                    </Form.Control>
                                </InputGroup.Append>
                            </InputGroup>
                        </Form.Group>
                    </Form.Row>

                    <Form.Row  className="mb-lg-15 mb-md-10 mb-sm-5">
                        <Form.Group as={Col}>
                          <Form.Label>
                              First Name
                          </Form.Label>
                          <InputGroup>
                            <InputGroup.Prepend>
                                <InputGroup.Text>
                                <i className="icon-user"></i>
                                </InputGroup.Text>
                            </InputGroup.Prepend>
                            <Form.Control required type="text" placeholder="First Name"/>
                          </InputGroup>
                        </Form.Group>
                            
                        <Form.Group as={Col} controlId="formGridPassword">
                            <Form.Label>Last Name</Form.Label>
                            <InputGroup>
                                <InputGroup.Prepend>
                                    <InputGroup.Text>
                                    <i className="icon-user"></i>
                                </InputGroup.Text>
                                </InputGroup.Prepend>
                                <Form.Control type="text" placeholder="Last Name"/>
                            </InputGroup>
                        </Form.Group>
                    </Form.Row>

                    <Form.Row className="mb-25">
                        <Form.Group as={Col} controlId="formGridPassword">
                            <Form.Label>Address</Form.Label>
                            <InputGroup>
                                <InputGroup.Prepend>
                                    <InputGroup.Text>
                                    <i className="icon-location-pin"></i>
                                </InputGroup.Text>
                                </InputGroup.Prepend>
                                <Form.Control required type="text" placeholder="Address"/>
                                <InputGroup.Append>
                                    <Form.Control as="select">
                                        <option title="Douala">DLA</option>
                                        <option title="Yaounde">YDE</option>
                                        <option title="Bamenda">BDA</option>
                                        <option title="Buea">BUE</option>
                                        <option title="Bafoussam">BAF</option>
                                        <option title="Kumba">KBA</option>
                                        <option title="Limbe">LBE</option>
                                    </Form.Control>
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

export default CreateOrderForm;
