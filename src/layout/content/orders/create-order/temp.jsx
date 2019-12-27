import React from 'react'
import Logo1 from '../../../../assets/img/logo1.jpg'
import { Container, Row, Button, Form, Col, InputGroup } from 'react-bootstrap';
import { createNewOrder } from '../../../../redux/orders/orders.actions';
import $ from 'jquery';
import { connect } from 'react-redux';


const CreateOrderForm = ({createNewOrder})=> {
    const formDataInit = {
        customerNumber:'',
        amountIn:'progress',
        amountOut:'MoMo',
        currencyIn:'13 Nov 2018',
        currencyOut:'13 Nov 2018',
        firsName:'',
        lastName:'13 Nov 2018',
        customerAddress:'',
        customerTown:''
    };
    const [newOrder, setnewOrder] = React.useState({})
    const [formData, setformData] = React.useState(formDataInit);
    const [validated, setValidated] = React.useState(false);
    
    const handleChange = (event) =>{
        setformData({...formData,[event.target.name]:event.target.value});
        console.log(formData);
    }
  const handleSubmit = event => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
        return;
    }
    setnewOrder({
        profileImgUrl: Logo1,
        customerName:`${formData.firsName} ${formData.lastName}`,
        createdDate:'13 Nov 2018',
        transactionStatus:'progress',
        transactionType:'Western Union',
        modifiedDate:'13 Nov 2018',
        orderId:''
    })
    console.log(newOrder);
    setValidated(true);
    $('.close').trigger('click');

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
                                name="customerNumber"
                                onChange={handleChange}
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
                                <Form.Control name="amountIn" required type="text" placeholder="Amount In"/>
                                <InputGroup.Append>
                                    <Form.Control as="select" name="currencyIn">
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
                                <Form.Control name="amountOut" required type="text" placeholder="Amount Out"/>
                                <InputGroup.Append>
                                    <Form.Control as="select" name="currencyOut">
                                        <option>XAF</option>
                                        <option>AED</option>
                                    </Form.Control>
                                </InputGroup.Append>
                            </InputGroup>
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
                                <Form.Control name="lastName" onChange={handleChange} type="text" placeholder="Last Name"/>
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
                                <Form.Control onChange={handleChange} name="customerAddress" required type="text" placeholder="Address"/>
                                <InputGroup.Append>
                                    <Form.Control as="select" name="addressTown">
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
const mapStateToProps = dispatch =>({
    createNewOrder: order => dispatch(createNewOrder(order))
})
export default connect(mapStateToProps)(CreateOrderForm);
