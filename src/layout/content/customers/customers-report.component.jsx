import React from 'react'
import MonthsCustomerReport from './report/months-customer-report.component'
import ReferredCustomersReport from './report/referrer-customers-report.component';
import OrdersCustomersReport from './report/orders-customers-report.component';

const CustomersReports = ()=>{

    return(
        <div className="hk-row">
            <MonthsCustomerReport/>
            <ReferredCustomersReport/>
            <OrdersCustomersReport/>
        </div>
    )
}
export default CustomersReports;