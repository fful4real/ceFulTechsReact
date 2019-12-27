import React from 'react'
import OrdersReports from './orders-reports.component'
import OrdersAnalysis from './orders-analysis.component'
import OrdersHeader from './orders-header.component'
import './orders.styles.scss'
import LastTenOrdersList from './last-ten-orders/last-ten-orders-list.component'

const OrdersPage = () =>{
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

export default OrdersPage;