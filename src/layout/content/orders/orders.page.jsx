import React, { useEffect } from 'react'
import OrdersReports from './orders-reports.component'
import OrdersAnalysis from './orders-analysis.component'
import OrdersHeader from './orders-header.component'
import './orders.styles.scss'
import LastTenOrdersList from './last-ten-orders/last-ten-orders-list.component'
import { fetchOrdersAsync } from '../../../redux/orders/orders.actions'
import { connect } from 'react-redux'

const OrdersPage = ({fetchOrdersAsync}) =>{
    // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    fetchOrdersAsync();
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

export default connect(null, mapDispatchToProps)(OrdersPage);