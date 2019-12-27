import React from 'react'
import AccountBalanceReport from './report/account-balance.component'
import AccountCountReport from './report/acount-count.component'

const AccountsReports = ()=>{

    return(
        <div className="hk-row">
            <AccountBalanceReport/>
            <AccountCountReport/>
        </div>
    )
}
export default AccountsReports;