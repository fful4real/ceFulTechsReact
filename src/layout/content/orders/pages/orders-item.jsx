import React from 'react'
<<<<<<< HEAD
import OrderItemForm from '../forms/order-item.form'
import OrderItemCustomerForm from '../forms/order-item-customer.form'
=======
// import OrderItemCustomerForm from '../forms/order-item-customer.form'
>>>>>>> b17fb8b
import { withRouter } from 'react-router-dom'
import { selectOrders } from '../../../../redux/orders/orders.selectors'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'
<<<<<<< HEAD

const  OrdersItem = ({orders, match}) =>{
    const order = orders.filter(order=>parseInt(order.id)===parseInt(match.params.id))[0]
=======
import OrderItemForm from '../forms/order-item.form.jsx'
import OrderItemCustomerForm from '../forms/order-item-customer.form'

const  OrdersItem = ({orders, match}) =>{
    const order = orders.filter(order=>parseInt(order.id)===parseInt(match.params.id))[0]
    console.log(order)
>>>>>>> b17fb8b
    return (
        <div className="row">
            <div className="col-xl-12">
                <section className="hk-sec-wrapper">
<<<<<<< HEAD
                    <h5 className="hk-sec-title mb-20">Order Item</h5>
=======
                    <h5 className="hk-sec-title mb-20">Order {order.orderRef}</h5>
>>>>>>> b17fb8b
                    <div className="row">
                        <div className="col-sm">
                            <div className="row">
                                <div className="col-12 col-md-6">
<<<<<<< HEAD
                                    <OrderItemForm order={order} />
=======
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
>>>>>>> b17fb8b
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
                    <h5 className="hk-sec-title mb-20">
                        Order Entries
                    </h5>
                </section>
            </div>
        </div>
    )
}


const ordersState = createStructuredSelector({
<<<<<<< HEAD
    orders: selectOrders
=======
    orders: selectOrders,
>>>>>>> b17fb8b
})

export default withRouter(connect(ordersState)(OrdersItem))
