import React from 'react'
import TotalCustomersReport from './reports/total-orders-report.component';
import MonthsOrdersReport from './reports/months-orders-report.component';
import ProcessedOrdersReport from './reports/processed-orders-report.component';
import AbandonedOrdersReport from './reports/abandoned-orders-report.component';

const OrdersReports = ()=>{

    return(
        <div className="hk-row">
            <TotalCustomersReport/>
            <MonthsOrdersReport />
            <ProcessedOrdersReport />
            <AbandonedOrdersReport />
        </div>
    )
}

export default OrdersReports;