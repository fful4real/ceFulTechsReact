import React from 'react'
import { Form, Col, InputGroup, Button } from 'react-bootstrap'
import { createStructuredSelector } from 'reselect'
import { selectCities } from '../../../../redux/cities/cities.selectors'
import { connect } from 'react-redux'
import { uid } from 'react-uid'
import Spinner from '../../../../components/spinner/spinner';

const CreateCustomerForm = ({cities, closeModal})=> {
    return (
        <Form>
            <Form.Row>
                <Form.Group as={Col} md="4" controlId="customerValidateNumber">
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
                        value=""
                        placeholder="Phone Number"
                        onChange={e=>console.log(e.target.value)}
                        disabled={false}
                    />
                    </InputGroup>
                </Form.Group>
                <Form.Group as={Col} md="4" controlId="customerValidateFirstName">
                    <Form.Label>First Name</Form.Label>
                    <InputGroup>
                    <InputGroup.Prepend>
                        <InputGroup.Text>
                        <i className="icon-user"></i>
                        </InputGroup.Text>
                    </InputGroup.Prepend>
                    <Form.Control 
                        type="text" 
                        aria-describedby="inputGroupPrepend"
                        name="customerFistName"
                        value=""
                        placeholder="First Name"
                        onChange={e=>console.log(e.target.value)}
                        disabled={false}
                    />
                    </InputGroup>
                </Form.Group>
                
                <Form.Group as={Col} md="4" controlId="customerValidateLastName">
                    <Form.Label>Last Name</Form.Label>
                    <InputGroup>
                    <InputGroup.Prepend>
                        <InputGroup.Text>
                        <i className="icon-user"></i>
                        </InputGroup.Text>
                    </InputGroup.Prepend>
                    <Form.Control 
                        type="text" 
                        aria-describedby="inputGroupPrepend"
                        name="customerLastName"
                        value=""
                        placeholder="Last Name"
                        onChange={e=>console.log(e.target.value)}
                        disabled={false}
                    />
                    </InputGroup>
                </Form.Group>
             </Form.Row>

             <Form.Row  className="form-row">
                <Form.Group as={Col} controlId="customerValidateAddress">
                    <Form.Label>Address</Form.Label>
                    <InputGroup>
                        <InputGroup.Prepend>
                            <InputGroup.Text>
                            <i className="icon-location-pin"></i>
                        </InputGroup.Text>
                        </InputGroup.Prepend>
                        <Form.Control 
                            value=""
                            name="customerAddress"
                        onChange={e=>console.log(e.target.value)}
                            type="text" 
                            placeholder="Address"
                            disabled={false}
                        />
                        <InputGroup.Append>
                            <select 
                                id="customerTown" 
                                className="form-control" 
                                value=""
                                onChange={e=>console.log(e.target.value)}
                                name="customerTown"
                                disabled={false}
                            >
                                {
                                    cities
                                    .map(({code, id})=>(
                                        <option key={`city-${uid({id})}`} value={code}>{code}</option>
                                        ))
                                }
                            </select>
                        </InputGroup.Append>
                    </InputGroup>
                </Form.Group>
            
            </Form.Row>

            <Form.Row>
                <Form.Group as={Col} md="6" className="mb-md-0 mb-lg-0 mb-s-5" controlId="validationSubmitForm">
                    <Button className="btn-block" disabled={false} variant="warning" size="lg" type="submit">
                        {
                            false? <Spinner spinnerHeight="24px" spinnerFontSize="1.2em" spinnerRight="48%"/>: "Add Customer"
                        }
                    </Button>
                </Form.Group>
                <Form.Group as={Col} md="6" className="mb-md-0 mb-lg-0 mb-s-5" controlId="validationCancel">
                    <Button className="btn-block" onClick={closeModal} disabled={false} variant="secondary" size="lg" type="button">
                        Cancel
                    </Button>
                </Form.Group>
            </Form.Row>
                            
        </Form>
    )
}

const mapStateToProps = createStructuredSelector({
    cities: selectCities
})

export default connect(mapStateToProps)(CreateCustomerForm)
