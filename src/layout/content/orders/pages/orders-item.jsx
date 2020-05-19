import React from 'react'
// import OrderItemCustomerForm from '../forms/order-item-customer.form'
import { withRouter, Redirect } from 'react-router-dom'
import { selectOrders } from '../../../../redux/orders/orders.selectors'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'
import OrderItemForm from '../forms/order-item.form.jsx'
import OrderItemCustomerForm from '../forms/order-item-customer.form'
import OrderItemEntries from './order-item-entries'

const  OrdersItem = ({orders, match}) =>{
    const order = orders.filter(order=>parseInt(order.id)===parseInt(match.params.id))[0]
    if(!order){
        return <Redirect to="/orders"/>
    }
    
    // console.log(order)
    return (
        <div className="row">
            <div className="col-xl-12">
                <section className="hk-sec-wrapper">
                    <h5 className="hk-sec-title mb-20">Order {order.orderRef}</h5>
                    <div className="row">
                        <div className="col-sm">
                            <div className="row">
                                <div className="col-12 col-md-6">
                                    <div className="card bg-light">
                                        <div className="card-header d-flex justify-content-between">
                                            <h6>Order Info</h6>
                                            <div className="d-flex">
                                                <span className={`badge badge-${order.status.className}`}>{order.status.statusLabel} order</span>
                                            </div>
                                        </div>
                                        <div className="card-body">
                                            <OrderItemForm order={order} />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 col-md-6">
                                    <div className="card bg-light">
                                        <div className="card-header d-flex justify-content-between">
                                            <h6>Customer Info</h6>
                                            <div className="d-flex">
                                                <span className="badge badge-success">New Customer</span>
                                            </div>
                                        </div>
                                        <div className="card-body">
                                            <OrderItemCustomerForm order={order} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <div className="col-xl-12">
                <section className="hk-sec-wrapper">
                    <h5 className="hk-sec-title">Order Entries</h5>
                        <OrderItemEntries order={order} />
                </section>
            </div>
        </div>
    )
}


const ordersState = createStructuredSelector({
    orders: selectOrders,
})

export default withRouter(connect(ordersState)(OrdersItem))
