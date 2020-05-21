import React from 'react'
import AccountCountReport from './report/AccountCountReport'
import XAFAccountBalance from './report/XAFAccountBalance'
import AEDAccountBalance from './report/AEDAccountBalance'

const AccountsReports = ()=>{

    return(
        <div className="hk-row">
            <AccountCountReport/>
            <XAFAccountBalance/>
            <AEDAccountBalance/>
        </div>
    )
}
export default AccountsReports;