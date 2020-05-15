import React from 'react'
import MonthsCustomerReport from './report/MonthsCustomersReport'
import TotalCustomersReport from './report/TotalCustomersReport';
import CustomersPendingOrdersReport from './report/CustomersPendingOrdersReport';

const CustomersReports = ()=>{

    return(
        <div className="hk-row">
            <TotalCustomersReport />
            <MonthsCustomerReport/>
            <CustomersPendingOrdersReport />
        </div>
    )
}
export default CustomersReports;