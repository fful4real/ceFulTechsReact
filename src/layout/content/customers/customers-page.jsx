import React from 'react'
import CustomersHeader from './customers-header.component'
import CustomersRepors from './customers-report.component'

import './customers.styles.scss'
import CustomersList from './customers-list.component'

const CustomersPage = () =>{
    return(
        <div className="hk-pg-wrapper">
            <div className="container mt-xl-30 mt-sm-20 mt-15">
                <CustomersHeader/>
                <div className="row">
                    <div className="col-xl-12">
                        <CustomersRepors />
                        <CustomersList />
                    </div>
                </div>
            </div>
        </div>
    ) 
    
}

export default CustomersPage;