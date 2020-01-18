import React, { useEffect } from 'react'
import OrdersReports from './orders-reports.component'
import OrdersAnalysis from './orders-analysis.component'
import OrdersHeader from './orders-header.component'
import './orders.styles.scss'
import LastTenOrdersList from './last-ten-orders/last-ten-orders-list.component'
import { fetchOrdersAsync } from '../../../redux/orders/orders.actions'
import { connect } from 'react-redux'
import { selectOrderCount } from '../../../redux/orders/orders.selectors'

const OrdersPage = ({fetchOrdersAsync,ordersCount}) =>{
    // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    !ordersCount && fetchOrdersAsync();
  });
    return(
        <div className="hk-pg-wrapper">
            <div className="container mt-xl-30 mt-sm-20 mt-15">
                <OrdersHeader/>
                <div className="row">
                    <div className="col-xl-12">
                        <OrdersReports />
                        <OrdersAnalysis />
                        <LastTenOrdersList/>
                    </div>
                </div>
            </div>
        </div>
    ) 
    
}

const mapDispatchToProps = dispatch => ({
    fetchOrdersAsync: ()=>dispatch(fetchOrdersAsync())
})

const ordersState = rootReducerState =>({
    ordersCount:selectOrderCount(rootReducerState)
})

export default connect(ordersState, mapDispatchToProps)(OrdersPage);