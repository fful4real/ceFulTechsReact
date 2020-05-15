import React from 'react'
import CustomersReports from './CustomersReports'
import LastTenCustomers from './LastTenCustomers'

export default function CustomersDashboard() {
    return (
        <div className="row">
            <div className="col-xl-12">
                <CustomersReports />
                <LastTenCustomers />
            </div>
        </div>
    )
}
