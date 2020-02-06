import React from 'react'
import OrdersReports from '../orders-reports.component'
import OrdersAnalysis from '../orders-analysis.component'
import LastTenOrdersList from '../last-ten-orders/last-ten-orders-list.component'

export default function OrdersDashboard() {
    return (
        <div className="row">
            <div className="col-xl-12">
                <OrdersReports />
                <OrdersAnalysis />
                <LastTenOrdersList/>
            </div>
        </div>
    )
}
