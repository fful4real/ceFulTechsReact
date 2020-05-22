import React from 'react'
import AccountsReports from './accounts-report.component'
import AccountsList from './AccountsList'

const AccountsDashoard =()=> {
    return (
        <div className="row">
            <div className="col-xl-12">
                <AccountsReports/>
                <AccountsList />
            </div>
        </div>
    )
}

export default AccountsDashoard
