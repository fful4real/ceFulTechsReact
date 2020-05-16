import React from 'react'
import CustomerProfileHeader from './profile/CustomerProfileHeader'
import CustomerProfileOrders from './profile/CustomerProfileOrders'
import { selectCustomers } from '../../../redux/customers/customers.selectors'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { createStructuredSelector } from 'reselect'
import { selectOrders } from '../../../redux/orders/orders.selectors'

function CustomerProfile({customers, match, orders}) {
    const customer = customers.filter(customer=>parseInt(customer.id)===parseInt(match.params.id))[0]
    const receivedOrders = customer.CustomersOrders.map(order=>{
        return orders.filter(olderOrder=>olderOrder.id===order.id)[0]
    })
    const sentOrders = customer.ordersByCustomer.map(order=>{
        return orders.filter(olderOrder=>olderOrder.id===order.id)[0]
    })
    const customerOrders = {received:receivedOrders, sent: sentOrders}
    return (
        <>
            <CustomerProfileHeader customer={customer} />
            <CustomerProfileOrders orders={customerOrders} />
        </>
    )
}

const ordersState = createStructuredSelector({
    customers: selectCustomers,
    orders: selectOrders
})

export default withRouter(connect(ordersState)(CustomerProfile))
