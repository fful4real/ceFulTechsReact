import React, {useState} from 'react'
import { Container, Row, Button, Form, Col, InputGroup } from 'react-bootstrap';
import {Formik} from 'formik'
import * as Yup from 'yup'
import Spinner from '../../components/spinner/spinner';
import { connect } from 'react-redux';
import { uid } from 'react-uid';
import OrderCustomerItem from '../../components/items/order-customer-item';
import OrderCustomerItemStyle from '../../components/items/styles/order-customer-item.style';
import API_ROUTES from '../../api-route';
import AxiosAgent from '../../axios-agent';
import Alert from '../../components/alert/alert';
import { addOrderToState } from '../../redux/orders/orders.actions';
import { addOrderToCustomer, addCustomerToState } from '../../redux/customers/customers.action';
import { createStructuredSelector } from 'reselect';
import { selectCustomers } from '../../redux/customers/customers.selectors';
import { selectCurrencies } from '../../redux/currencies/currencies.selectors';
import { selectCities } from '../../redux/cities/cities.selectors';
import { sanitizeString } from '../../helpers/helper';

const CreateOrderForm = ({customers, addCustomerToState, currencies, cities, addOrderToState, addOrderToCustomer})=>{
    const currencyInObj = currencies.filter(currency=>currency.currencyCode==="AED")[0]
    const currencyOutObj = currencies.filter(currency=>currency.currencyCode==="XAF")[0]
    const [searchString, setSearchString] = useState('');
    const [showDropdown, setShowDropdown] = useState('hide');
    const [showSuccess, setShowSuccess] = useState('hide');
    const isNewCustomer = (newCustomer)=>{
        return customers.find(customer=>customer.id===newCustomer.id)?false:true
    }
    const handleCustomer = customer=>{
        return customer.firstName.toLowerCase().indexOf(searchString.toLowerCase())!==-1 ||
                customer.lastName.toLowerCase().indexOf(searchString.toLowerCase())!==-1||
                customer.mobileNumber.toLowerCase().indexOf(searchString.toLowerCase())!==-1
    }
    const toggleShow = show=>setShowDropdown(show);
    let initialVals = {
        customerNumber:'',
        amountIn:'',
        amountOut:'',
        currencyIn:`/api/currencies/${currencyInObj.id}`,
        currencyOut: `/api/currencies/${currencyOutObj.id}`,
        firstName:'',
        lastName:'',
        customerAddress:'',
        customerTown:cities[0].code,
        orderNote:''

    }

    const validationSchema = Yup.object().shape({
        customerNumber: Yup.string()
                        .min(9,'Must have 9 characters')
                        .max(9,'Must not exceed 9 characters')
                        .required('Please enter number')
                        .matches(/^65|67|69|66|68/ , 'Invalid Cameroon number')
                        .matches(/^[0-9]+$/, 'Only Numbers accepted'),
            amountIn:Yup.string()
                        .required('Please enter amount')
                        .matches(/^[0-9]+$/, 'Only Numbers accepted'),
            amountOut:Yup.string()
                        .required('Please enter amount')
                        .matches(/^[0-9]+$/, 'Only Numbers accepted'),
            firstName:Yup.string()
                        .required('Enter First Name')
                        .max(255,'Must not exceed 255 characters'),
            customerAddress:Yup.string()
                        .required('Enter Address')
                        .max(255,'Must not exceed 255 characters')
    });

    return (
        <Container>
            <Row>
                <Formik 
                    initialValues={initialVals} 
                    validationSchema={validationSchema}
                    onSubmit={
                        (values, {setSubmitting,setErrors, error, resetForm, setStatus})=>{
                                if(values.currencyIn===values.currencyOut){
                                    setErrors({amountIn: 'Currency In must be different from Currency Out'})
                                    return false
                                }
                                const orderValues = {
                                    amountIn: parseInt(values.amountIn),
                                    amountOut: parseInt(values.amountOut),
                                    receiverNumber: values.customerNumber,
                                    currencyIn:values.currencyIn,
                                    currencyOut: values.currencyOut,
                                    firstName:values.firstName,
                                    lastName:values.lastName,
                                    city:values.customerTown,
                                    address: values.customerAddress,
                                    note:sanitizeString(values.orderNote)
                                }
                                
                                AxiosAgent.request('post', API_ROUTES.orders(), null, orderValues)
                                    .then(resp=>{
                                        const newOrder = resp.data
                                        setStatus({success: false})
                                        setShowSuccess('show')
                                        isNewCustomer(newOrder.customer)&&addCustomerToState(newOrder.customer)
                                        addOrderToState(newOrder)
                                        addOrderToCustomer(customers, newOrder)
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
                    }
                >
                    {({values, status, errors, touched, handleChange, handleSubmit, handleBlur, isSubmitting, setFieldValue})=>{
                        const handleCustomerClick = ({firstName, lastName, mobileNumber, address, fkCity}) =>{
                            setFieldValue('customerNumber',mobileNumber)
                            setFieldValue('firstName',firstName)
                            setFieldValue('lastName',lastName)
                            setFieldValue('customerAddress',address)
                            setFieldValue('customerTown',fkCity.code)
                        }
                    
                        return (
                        <Form 
                            onSubmit={handleSubmit}
                        >
                        {showSuccess!=='hide'&&<Alert alertIcon='check-circle' show={showSuccess}/>}
                            <Form.Row>
                                <Form.Group as={Col} md="4" controlId="validationPhoneNumber" onBlur={()=>setTimeout(()=>setShowDropdown('hide',),150)}>
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
                                        aria-describedby="inputGroupPrepend"
                                        name="customerNumber"
                                        onChange={e=>{setShowDropdown('show');handleChange(e); setSearchString(e.target.value)}}
                                        value={values.customerNumber}
                                        disabled={isSubmitting}
                                        className="dropdown"
                                        autoComplete="off"
                                    />
                                    {touched.customerNumber&&errors.customerNumber&&
                                        <Form.Control.Feedback type="invalid" style={{display:'block'}}>
                                            {errors.customerNumber}
                                        </Form.Control.Feedback>
                                    }
                                    </InputGroup>
                                    <div x-placement="bottom-start" 
                                        aria-labelledby="dropdown-basic"
                                        style={{
                                            position:'absolute',
                                            top:'73px',
                                            left:'7px',
                                            transform:"translate3d(0px, 0px, 0px)",
                                            willChange:"transform",
                                            width:'95%'
                                        }}
                                        className={`dropdown-menu ${showDropdown}`}
                                    >
                                        {
                                            customers.isFetchingCustomers?
                                            <div className="media-body">
                                                <Spinner spinnerHeight="24px" spinnerFontSize="1.2em" spinnerRight="48%"/>
                                            </div>:
                                            <div>
                                                <OrderCustomerItemStyle>
                                                    {
                                                        customers
                                                        .filter(customer=>handleCustomer(customer))
                                                        .map(({...customerItem})=>(
                                                                <OrderCustomerItem toggleShow={toggleShow} handleCustomerClick={handleCustomerClick} key={`transaction-item-${uid({...customerItem})}`} {...customerItem} />
                                                            ))
                                                    }
                                                </OrderCustomerItemStyle>
                                            </div>
                                        }
                                    
                                    </div>
                                
                                </Form.Group>
                                <Form.Group as={Col} md="4" controlId="validationAmountIn">
                                    <Form.Label>Amount In</Form.Label>
                                    <InputGroup>
                                            <InputGroup.Prepend>
                                                <InputGroup.Text>
                                                <i className="icon-arrow-down-circle"></i>
                                            </InputGroup.Text>
                                            </InputGroup.Prepend>
                                            <Form.Control 
                                                name="amountIn" 
                                                onChange={handleChange}
                                                type="text" 
                                                placeholder="Amount In"
                                                value={values.amountIn}
                                                disabled={isSubmitting}
                                                onBlur={handleBlur}
                                                autoComplete="off"
                                            />
                                            <InputGroup.Append>
                                            <InputGroup.Text>
                                                <span>{currencyInObj.currencyCode}</span>
                                            </InputGroup.Text>
                                            </InputGroup.Append>
                                    </InputGroup>
                                    {touched.amountIn&&errors.amountIn&&
                                        <Form.Control.Feedback style={{display:'block'}} type='invalid'>
                                            {errors.amountIn}
                                        </Form.Control.Feedback>
                                    }
                                </Form.Group>
                            
                                <Form.Group as={Col} md="4" controlId="validationAmountOut">
                                    <Form.Label>Amount Out</Form.Label>
                                    <InputGroup>
                                            <InputGroup.Prepend>
                                                <InputGroup.Text>
                                                <i className="icon-arrow-up-circle"></i>
                                            </InputGroup.Text>
                                            </InputGroup.Prepend>
                                            <Form.Control 
                                                name="amountOut" 
                                                onChange={handleChange} 
                                                type="text" 
                                                placeholder="Amount Out"
                                                value={values.amountOut}
                                                disabled={isSubmitting}
                                                onBlur={handleBlur}
                                                autoComplete="off"
                                            />
                                            <InputGroup.Append>
                                                <InputGroup.Text>
                                                    <span>{currencyOutObj.currencyCode}</span>
                                                </InputGroup.Text>
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
                                <Form.Group as={Col}  md="4" controlId="validationFirstName">
                                <Form.Label>
                                    First Name
                                </Form.Label>
                                <InputGroup>
                                    <InputGroup.Prepend>
                                        <InputGroup.Text>
                                        <i className="icon-user"></i>
                                        </InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <Form.Control 
                                        onChange={handleChange} 
                                        name="firstName" 
                                        value={values.firstName} 
                                        type="text" 
                                        placeholder="First Name"
                                        disabled={isSubmitting}
                                        onBlur={handleBlur}
                                    />
                                    {touched.firstName&&errors.firstName&&
                                        <Form.Control.Feedback style={{display:'block'}} type='invalid'>
                                            {errors.firstName}
                                        </Form.Control.Feedback>
                                    }
                                </InputGroup>
                                </Form.Group>
                                    
                                <Form.Group as={Col}  md="4" controlId="validateionLastName">
                                    <Form.Label>Last Name</Form.Label>
                                    <InputGroup>
                                        <InputGroup.Prepend>
                                            <InputGroup.Text>
                                            <i className="icon-user"></i>
                                        </InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <Form.Control 
                                            name="lastName" 
                                            value={values.lastName} 
                                            onChange={handleChange} 
                                            type="text" 
                                            placeholder="Last Name"
                                            disabled={isSubmitting}
                                            onBlur={handleBlur}
                                        />
                                    </InputGroup>
                                </Form.Group>
                                
                                <Form.Group as={Col} md="4" controlId="validationAddress">
                                        <Form.Label>Address</Form.Label>
                                        <InputGroup>
                                            <InputGroup.Prepend>
                                                <InputGroup.Text>
                                                <i className="icon-location-pin"></i>
                                            </InputGroup.Text>
                                            </InputGroup.Prepend>
                                            <Form.Control 
                                                onChange={handleChange} 
                                                value={values.customerAddress} 
                                                name="customerAddress" 
                                                type="text" 
                                                placeholder="Address"
                                                disabled={isSubmitting}
                                                onBlur={handleBlur}
                                            />
                                            <InputGroup.Append>
                                                <select 
                                                    id="customerTown" 
                                                    onChange={handleChange} 
                                                    className="form-control" 
                                                    value={values.customerTown}
                                                    name="customerTown"
                                                    disabled={isSubmitting}
                                                >
                                                    {
                                                        cities
                                                        .map(({code, id})=>(
                                                            <option key={`currency-${uid({id})}`} value={code}>{code}</option>
                                                            ))
                                                    }
                                                </select>
                                            </InputGroup.Append>
                                        </InputGroup>
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

                            
                            <Button className="btn-block" disabled={isSubmitting} variant="success" size="lg" type="submit">
                                {
                                    isSubmitting? <Spinner spinnerHeight="24px" spinnerFontSize="1.2em" spinnerRight="48%"/>: "Create"
                                }
                            </Button>

                            {/* {JSON.stringify(values,null,2)} */}

                        </Form>
                    )}}
                </Formik>
            </Row>
          </Container>
    )
}

const mapDispatchToProps = {
    addOrderToState,
    addOrderToCustomer,
    addCustomerToState
  }
  
  const mapStateToProps = createStructuredSelector({
    customers:selectCustomers,
    currencies:selectCurrencies,
    cities:selectCities
  })

export default connect(mapStateToProps, mapDispatchToProps)(CreateOrderForm)
