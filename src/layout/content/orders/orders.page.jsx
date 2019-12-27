import React from 'react'
import OrdersReports from './orders-reports.component'
import OrdersAnalysis from './orders-analysis.component'
import OrdersHeader from './orders-header.component'
import LastTenTransactionsList from '../dashboard/last-transactions/last-ten-transactions-list.component'
import './orders.styles.scss'

const OrdersPage = () =>{
    return(
        <div className="hk-pg-wrapper">
            <div className="container mt-xl-30 mt-sm-20 mt-15">
                <OrdersHeader/>
                <div className="row">
                    <div className="col-xl-12">
                        <OrdersReports />
                        <OrdersAnalysis />
                        <LastTenTransactionsList/>
                    </div>
                </div>
            </div>
        </div>
    ) 
    
}

export default OrdersPage;