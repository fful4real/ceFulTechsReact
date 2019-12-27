import React from 'react'
import IosPersonOutline from 'react-ionicons/lib/IosPersonOutline'

const AccountItem = (
    {accountName,accountCode, accountBalance, accountCurrency, accountCreatedDate, accountBank}
    )=>{

        

    return(
        <tr className="account-item">
            <td>
                <div className="avatar avatar-xs">
                    <span className="avatar-text avatar-text-info rounded-circle"><span className="initial-wrap">
                        <span><IosPersonOutline fontSize="15px"/></span>
                    </span>
                    </span>
                </div>
                <span className="text-value">{accountName}</span></td>
            <td>{accountCode}</td>
            <td>{accountBalance}</td>
            <td>{accountBank}</td>
            <td>{accountCreatedDate}</td>
        </tr>
    )
}

export default AccountItem;