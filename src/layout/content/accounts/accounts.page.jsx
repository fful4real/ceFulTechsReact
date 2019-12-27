import React from 'react'

import './accounts.styles.scss'
import AccountsHeader from './accounts-header.component';
import AccountsReports from './accounts-report.component';
import AccountsList from './accounts-list.component';

const AccountsPage = () =>{
    return(
        <div className="hk-pg-wrapper">
            <div className="container mt-xl-30 mt-sm-20 mt-15">
                <AccountsHeader/>
                <div className="row">
                    <div className="col-xl-12">
                        <AccountsReports/>
                        <AccountsList/>
                    </div>
                </div>
            </div>
        </div>
    ) 
    
}

export default AccountsPage;