import React, { useEffect } from 'react'
import avatar1 from '../../../../assets/img/gallery/mankaa.jpeg'
import { CustomerProfileStyle } from '../styles/CustomerProfileStyle'
import { selectCustomers, selectCurrentCustomer } from '../../../../redux/customers/customers.selectors'
import { createStructuredSelector } from 'reselect'
import { withRouter, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import DisplayCustomerProfileOrderDetail from '../components/DisplayCustomerProfileOrderDetail'
import { setCustomerModalAsync, setCurrentCustomerAttempt, setCustomerModalHeadingAttempt, setIsSentByAttempt } from '../../../../redux/customers/customers.action'
import { selectIsAppLoaded } from '../../../../redux/fultechs/FultechsSelectors'
import { Dropdown } from 'react-bootstrap'
import FulTechsTooltip from '../../../../components/FulTechsTooltip'
import { ImageUrl } from '../../../../api-route'

const CustomerProfileHeader = ({setIsSentBy,customer,appIsLoaded, currentCustomer, customers,setModalHeading, setModal, setCustomer}) => {
    
    useEffect(() => {
        setCustomer(customer.id)
    }, [setCustomer,customer.id])

    const handleCustomerOrder = (title, isSentBy) => {
        setIsSentBy(isSentBy)
        setModalHeading(title)
        setModal('newCustomerOrder')
    }
    if (currentCustomer&&!customer) {
        customer = customers.filter(mapCustomer=>mapCustomer.id===currentCustomer)[0]
    }
    if (!customer) {
        return <Redirect to="/customers" />
    }
    
    let sent = {
        amountIn:0, 
        currencyIn:'',
        amountOut:0,
        currencyOut:'',
        count:0,
        badge:'info',
        label:'Sent',
        topArrow:'right',
        bottomArrow: 'left',
        topArrowClass:'success',
        bottomArrowClass: 'danger'
    }
    if(customer.ordersByCustomer.length){
        customer.ordersByCustomer.map(order=>{
            sent = {
                ...sent,
                amountIn: sent.amountIn+order.amountIn, 
                amountOut: sent.amountOut+order.amountOut, 
                currencyIn:order.currencyIn.currencyCode,
                currencyOut:order.currencyOut.currencyCode,
            }
            return order
        })
        sent = {...sent, count:customer.ordersByCustomer.length}
    }
    
    
    let received = {
        amountIn:0, 
        currencyIn:'',
        amountOut:0,
        currencyOut:'',
        count:0,
        badge:'primary',
        label:'Received',
        topArrow:'left',
        bottomArrow: 'right',
        topArrowClass:'danger',
        bottomArrowClass: 'success'
    }
    if(customer.CustomersOrders.length){
        customer.CustomersOrders.map(order=>{
            if (order.currencyOut||order.currencyIn) {
                received = {
                    ...received,
                    amountIn: received.amountIn+order.amountIn, 
                    amountOut: received.amountOut+order.amountOut, 
                    currencyIn:order.currencyIn.currencyCode,
                    currencyOut:order.currencyOut.currencyCode,
                }
            }
            return order
        })
        received = {...received, count:customer.CustomersOrders.length}
    }

    let processed = {
        amountIn:0, 
        currencyIn:'',
        amountOut:0,
        currencyOut:'',
        count:0,
        badge:'success',
        label:'Processed',
        topArrow:'right',
        bottomArrow: 'left',
        topArrowClass:'success',
        bottomArrowClass: 'danger'
    }
    let processedOrders = [...customer.ordersByCustomer, ...customer.CustomersOrders]
    processedOrders = processedOrders.filter(pOrder=>{
        if (pOrder.status) {
            return pOrder.status.statusCode==='OK'
        }
        return false
    })
    if(processedOrders.length){
        processedOrders.map(order=>{
            processed = {
                ...processed,
                amountIn: processed.amountIn+order.amountIn, 
                amountOut: processed.amountOut+order.amountOut, 
                currencyIn:order.currencyIn.currencyCode,
                currencyOut:order.currencyOut.currencyCode,
            }
            return order
        })
        processed = {...processed, count:processedOrders.length}
    }

    let abandoned = {
        amountIn:0, 
        currencyIn:'',
        amountOut:0,
        currencyOut:'',
        count:0,
        badge:'secondary',
        label:'Abandoned',
        topArrow:'right',
        bottomArrow: 'left',
        topArrowClass:'success',
        bottomArrowClass: 'danger'
    }
    let abandonedOrders = [...customer.ordersByCustomer, ...customer.CustomersOrders]
    abandonedOrders = abandonedOrders.filter(pOrder=>{
        if(pOrder.status){
            return pOrder.status.statusCode==='ABN'
        }
        return false
    })
    if(abandonedOrders.length){
        abandonedOrders.map(order=>{
            abandoned = {
                ...abandoned,
                amountIn: abandoned.amountIn+order.amountIn, 
                amountOut: abandoned.amountOut+order.amountOut, 
                currencyIn:order.currencyIn.currencyCode,
                currencyOut:order.currencyOut.currencyCode,
            }
            return order
        })
        abandoned = {...abandoned, count:abandonedOrders.length}
    }

    let pending = {
        amountIn:0, 
        currencyIn:'',
        amountOut:0,
        currencyOut:'',
        count:0,
        badge:'danger',
        label:'Pending',
        topArrow:'right',
        bottomArrow: 'left',
        topArrowClass:'success',
        bottomArrowClass: 'danger'
    }
    let pendingOrders = [...customer.ordersByCustomer, ...customer.CustomersOrders]
    pendingOrders = pendingOrders.filter(pOrder=>{
        if(pOrder.status){
            return pOrder.status.statusCode==='PTL'
        }
        return false
    })
    if(pendingOrders.length){
        pendingOrders.map(order=>{
            pending = {
                ...pending,
                amountIn: pending.amountIn+order.amountIn, 
                amountOut: pending.amountOut+order.amountOut, 
                currencyIn:order.currencyIn.currencyCode,
                currencyOut:order.currencyOut.currencyCode,
            }
            return order
        })
        pending = {...pending, count:pendingOrders.length}
    }

    let neworder = {
        amountIn:0, 
        currencyIn:'',
        amountOut:0,
        currencyOut:'',
        count:0,
        badge:'success',
        label:'New',
        topArrow:'right',
        bottomArrow: 'left',
        topArrowClass:'success',
        bottomArrowClass: 'danger'
    }
    let newOrders = [...customer.ordersByCustomer, ...customer.CustomersOrders]
    newOrders = newOrders.filter(nOrder=>{
        if(nOrder.status){
            return nOrder.status.statusCode==='NEW'
        }
        return false
    })
    
    if(newOrders.length){
        newOrders.map(order=>{
            neworder = {
                ...neworder,
                amountIn: neworder.amountIn+order.amountIn, 
                amountOut: neworder.amountOut+order.amountOut, 
                currencyIn:order.currencyIn.currencyCode,
                currencyOut:order.currencyOut.currencyCode,
            }
            return order
        })
        neworder = {...neworder, count:newOrders.length}
    }

    const totalOrders = received.count+sent.count
    
    return (
        <div className="row">
            <div className="col-xl-12">
                <div className="hk-sec-wrapper">
                    <CustomerProfileStyle>
                        <div className="hk-row">
                            <div className="col-lg-4 d-flex justify-content-left">
                                <div className="media position-relative align-items-center profile-cover-content">
                                    {appIsLoaded&&<div className="modify-customer-profile position-absolute cursor-pointer">
                                        <Dropdown className="d-inline">
                                            <Dropdown.Toggle className="no-caret" variant="link">
                                                <i className="ion ion-ios-settings text-muted"></i>
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu>
                                                <Dropdown.Item href="#" onClick={()=>setModal('modify')}>
                                                    <i className="dropdown-icon zmdi zmdi-edit text-dark"></i>
                                                    <span>Modify</span>
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#" onClick={()=>setModal('delete')}>
                                                    <i className="dropdown-icon zmdi zmdi-block text-danger"></i>
                                                    <span>Delete</span>
                                                </Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </div>}
                                    <div className="media-img-wrap  d-flex">
                                        <div className="customer-avatar avatar position-relative">
                                            <FulTechsTooltip tooltipMessage="update profile picture">
                                                <i className="ion ion-ios-create text-muted position-absolute cursor-pointer t-0 r-0" onClick={()=>setModal('modifyProfile')}></i>
                                            </FulTechsTooltip>
                                            <img src={customer.profileImage?ImageUrl+customer.profileImage.url:avatar1} alt="user" className="avatar-img rounded-circle"></img>
                                        </div>
                                    </div>
                                    <div className="media-body">
                                        <div className="text-capitalize display-6 mb-5 font-weight-400">{`${customer.firstName} ${customer.lastName}`}</div>
                                        <div className="font-14 mb-5">
                                            <span className="mr-5">
                                                <span className="font-weight-500">
                                                    <i className="ion ion-md-call font-weight-400 mr-5"></i> Phone:&nbsp;
                                                </span>
                                                <span className="mr-5 customer-profile-phone">{customer.mobileNumber}</span>
                                            </span>
                                        </div>
                                        <div className="font-14 mb-5">
                                            <span className="mr-5">
                                                <span className="font-weight-500">
                                                    <i className="ion ion-md-pin font-weight-500 mr-5"></i> Address:&nbsp;
                                                </span>
                                                <span className="mr-5 profile-address">{customer.address}</span>
                                            </span>
                                            <span className="custoemr-profile-city text-capitalize">{customer.fkCity.code}</span>
                                        </div>
                                       
                                        <div className={`font-14 mb-5 email ${customer.email?'d-block':'d-none'}`}>
                                                <span className="mr-5">
                                                    <span className="font-weight-500">
                                                        <i className="ion ion-md-mail font-weight-500 mr-5"></i> Email:&nbsp;
                                                    </span>
                                                    <span className="mr-5">{customer.email}</span>
                                                </span>
                                            </div>
                                        </div>
                                        
                                </div>
                            </div>
                            <div className="col-lg-8">
                                <div className="card">
                                    <h6 className="bg-light card-header text-center">Total Orders {totalOrders}</h6>
                                    
                                    <div className="row">
                                        <div className="col-lg-6">
                                            <ul className="list-group list-group-flush">
                                                <DisplayCustomerProfileOrderDetail attr={sent}/>
                                                <DisplayCustomerProfileOrderDetail attr={received}/>
                                                <DisplayCustomerProfileOrderDetail attr={processed}/>
                                            </ul>
                                        </div>
                                        <div className="col-lg-6">
                                            <ul className="list-group list-group-flush">
                                                <DisplayCustomerProfileOrderDetail attr={abandoned}/>
                                                <DisplayCustomerProfileOrderDetail attr={pending}/>
                                                <DisplayCustomerProfileOrderDetail attr={neworder}/>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-lg-6 col-md-6 col-sm-12">
                                            <button 
                                                className="btn btn-link btn-block" 
                                                onClick={()=>{handleCustomerOrder('Receive Order', false)}}
                                            >
                                                Receive Order
                                            </button>
                                        </div>
                                        <div className="col-lg-6 col-md-6 col-sm-12">
                                            <button 
                                                className="btn btn-link btn-block" 
                                                onClick={()=>{handleCustomerOrder('Send Order', true)}}
                                            >
                                                Send Order
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CustomerProfileStyle>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = createStructuredSelector({
    customers: selectCustomers,
    currentCustomer: selectCurrentCustomer,
    appIsLoaded: selectIsAppLoaded
})

const mapDispatchToProps = {
    setModal: setCustomerModalAsync,
    setCustomer: setCurrentCustomerAttempt,
    setModalHeading: setCustomerModalHeadingAttempt,
    setIsSentBy: setIsSentByAttempt
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CustomerProfileHeader))
