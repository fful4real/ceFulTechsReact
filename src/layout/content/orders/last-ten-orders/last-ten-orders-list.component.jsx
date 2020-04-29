import React from 'react'
import { connect } from 'react-redux'
import { selectLastTenOrders} from '../../../../redux/orders/orders.selectors'
import { createStructuredSelector } from 'reselect'
import OrdersList from '../pages/orders-list'
import moment from 'moment'

const LastTenOrdersList = ({lastTenOrders})=>{
    lastTenOrders=lastTenOrders.map(order=>({...order, datec:moment(order.datec).format("DD - MMM - YYYY")}))
    return (
        <OrdersList data={lastTenOrders}  listTitle="Last Ten Orders" />
)}

const mapStateToProps = createStructuredSelector({
    lastTenOrders:selectLastTenOrders
})

export default connect(mapStateToProps)(LastTenOrdersList);