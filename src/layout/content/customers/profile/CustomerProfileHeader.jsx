import React from 'react'
import avatar1 from '../../../../assets/img/gallery/mankaa.jpeg'
import { CustomerProfileStyle } from '../styles/CustomerProfileStyle'
import { selectCustomers } from '../../../../redux/customers/customers.selectors'
import { createStructuredSelector } from 'reselect'
import { withRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import DisplayCustomerProfileOrderDetail from '../components/DisplayCustomerProfileOrderDetail'
import { setCustomerModalAsync, setCurrentCustomerAttempt } from '../../../../redux/customers/customers.action'
import { useEffect } from 'react'

const CustomerProfileHeader = ({customer, setModal, setCustomer}) => {
    useEffect(() => {
        setCustomer(customer.id)
    }, [setCustomer,customer.id])
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
            received = {
                ...received,
                amountIn: received.amountIn+order.amountIn, 
                amountOut: received.amountOut+order.amountOut, 
                currencyIn:order.currencyIn.currencyCode,
                currencyOut:order.currencyOut.currencyCode,
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
    processedOrders = processedOrders.filter(pOrder=>pOrder.status.statusCode==='OK')
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
    abandonedOrders = abandonedOrders.filter(pOrder=>pOrder.status.statusCode==='ABN')
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
    pendingOrders = pendingOrders.filter(pOrder=>pOrder.status.statusCode==='PTL')
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
    newOrders = newOrders.filter(pOrder=>pOrder.status.statusCode==='OK')
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
    
    return (
        <div className="row">
            <div className="col-xl-12">
                <div className="hk-sec-wrapper">
                    <CustomerProfileStyle>
                        <div className="hk-row">
                            <div className="col-lg-4 d-flex justify-content-left">
                                <div className="media position-relative align-items-center profile-cover-content">
                                    <div className="modify-customer-profile position-absolute cursor-pointer">
                                        <div className="inline-block dropdown">
                                            <span className="dropdown-toggle no-caret" data-toggle="dropdown" aria-expanded="false" role="button">
                                                <i className="ion ion-ios-settings "></i>
                                            </span>
                                            <div className="dropdown-menu dropdown-menu-right" x-placement="bottom-end">
                                                <Link to="#" className="dropdown-item" onClick={()=>setModal('modify')}>
                                                    <i className="dropdown-icon zmdi zmdi-edit"></i>
                                                    <span>Modify</span>
                                                </Link>
                                                <Link to="#" className="dropdown-item">
                                                    <i className="dropdown-icon zmdi zmdi-block text-danger"></i>
                                                    <span>Delete</span>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="media-img-wrap  d-flex">
                                        <div className="customer-avatar avatar">
                                            <img src={avatar1} alt="user" className="avatar-img rounded-circle"></img>
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
                                    <h6 className="bg-light card-header text-center">Orders</h6>
                                    
                                    <div className="row">
                                        <div className="col-lg-6">
                                            <ul className="list-group list-group-flush">
                                                <li className="list-group-item d-flex align-items-center justify-content-between">
                                                    <DisplayCustomerProfileOrderDetail attr={sent}/>
                                                </li>
                                                
                                                <li className="list-group-item d-flex align-items-center justify-content-between">
                                                    <DisplayCustomerProfileOrderDetail attr={received}/>
                                                </li>
                                                
                                                <li className="list-group-item d-flex align-items-center justify-content-between">
                                                    <DisplayCustomerProfileOrderDetail attr={processed}/>
                                                </li>
                                                
                                            </ul>
                                        </div>
                                        <div className="col-lg-6">
                                            <ul className="list-group list-group-flush">
                                                <li className="list-group-item d-flex align-items-center justify-content-between">
                                                    <DisplayCustomerProfileOrderDetail attr={abandoned}/>
                                                </li>
                                                
                                                <li className="list-group-item d-flex align-items-center justify-content-between">
                                                    <DisplayCustomerProfileOrderDetail attr={pending}/>
                                                </li>
                                                
                                                <li className="list-group-item d-flex align-items-center justify-content-between">
                                                    <DisplayCustomerProfileOrderDetail attr={neworder}/>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-lg-12">
                                            <button className="btn btn-link btn-block">Place New Order</button>
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

const ordersState = createStructuredSelector({
    customers: selectCustomers
})

const mapDispatchToProps = {
    setModal: setCustomerModalAsync,
    setCustomer: setCurrentCustomerAttempt,
}

export default withRouter(connect(ordersState, mapDispatchToProps)(CustomerProfileHeader))
