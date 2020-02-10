import React from 'react'
import OrderItemForm from '../forms/order-item.form'
import OrderItemCustomerForm from '../forms/order-item-customer.form'
import { withRouter } from 'react-router-dom'
import { selectOrders } from '../../../../redux/orders/orders.selectors'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'

const  OrdersItem = ({orders, match}) =>{
    const order = orders.filter(order=>parseInt(order.id)===parseInt(match.params.id))[0]
    return (
        <div className="row">
            <div className="col-xl-12">
                <section className="hk-sec-wrapper">
                    <h5 className="hk-sec-title mb-20">Order Item</h5>
                    <div className="row">
                        <div className="col-sm">
                            <div className="row">
                                <div className="col-12 col-md-6">
                                    <OrderItemForm order={order} />
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
    orders: selectOrders
})

export default withRouter(connect(ordersState)(OrdersItem))
