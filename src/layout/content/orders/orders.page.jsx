import React, { useEffect } from 'react'
import OrdersHeader from './orders-header.component'
import './orders.styles.scss'
import { fetchOrdersAsync } from '../../../redux/orders/orders.actions'
import { connect } from 'react-redux'
import { selectOrderCount } from '../../../redux/orders/orders.selectors'
import { createStructuredSelector } from 'reselect'
import OrdersDashboard from './pages/orders-dashboard'
import { Switch, Route } from 'react-router-dom'
import OrdersList from './pages/orders-list'
import OrdersItem from './pages/orders-item'

const OrdersPage = ({fetchOrdersAsync,ordersCount}) =>{
    // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    !ordersCount && fetchOrdersAsync();
  });
    return(
        <div className="hk-pg-wrapper">
            <div className="container mt-xl-30 mt-sm-20 mt-15">
                <OrdersHeader/>
                <Switch>
                    <Route path="/orders/list" component={OrdersList} />
                    <Route path="/orders/:id" component={OrdersItem} />
                    <Route path="/orders" component={OrdersDashboard} />
                </Switch>
            </div>
        </div>
    ) 
    
}

const mapDispatchToProps = dispatch => ({
    fetchOrdersAsync: ()=>dispatch(fetchOrdersAsync())
})

const ordersState = createStructuredSelector({
    ordersCount:selectOrderCount
})

export default connect(ordersState, mapDispatchToProps)(OrdersPage);