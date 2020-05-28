import React from 'react'
import TotalCustomersReport from './reports/total-orders-report.component';
import ProcessedOrdersReport from './reports/processed-orders-report.component';
import PendingOrdersReportComponent from './reports/pending-orders-report.component';
import NewOrdersReportComponent from './reports/new-orders-report.component';

const OrdersReports = ()=>{

    return(
        <div className="hk-row">
            <TotalCustomersReport/>
            <NewOrdersReportComponent />
            <ProcessedOrdersReport />
            <PendingOrdersReportComponent />
        </div>
    )
}


export default OrdersReports;