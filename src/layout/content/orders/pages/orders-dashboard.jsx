import React from 'react'
import OrdersReports from '../orders-reports.component'
import OrdersAnalysis from '../orders-analysis.component'
import OrdersPageLastTenOrders from './OrdersPageLastTenOrders'

export default function OrdersDashboard() {
    return (
        <div className="row">
            <div className="col-xl-12">
                <OrdersReports />
                <OrdersAnalysis />
                <OrdersPageLastTenOrders/>
            </div>
        </div>
    )
}
