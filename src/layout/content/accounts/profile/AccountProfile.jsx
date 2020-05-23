import React from 'react'
import { connect } from 'react-redux'
import { withRouter, Redirect } from 'react-router-dom'
import { createStructuredSelector } from 'reselect'
import AccountProfileHeader from './AccountProfileHeader'
import AccountProfileAccountEntries from './AccountProdileAccountEntries'
import { selectAccounts } from '../../../../redux/accounts/accounts.selector'

const AccountProfile = ({accounts, match})=> {
    if (!accounts) {
        return <Redirect to="/accounts" />
    }
    const account = accounts.filter(account=>parseInt(account.id)===parseInt(match.params.id))[0]
    if (!account) {
        return <Redirect to="/accounts" />
    }
    
    return (
        <>
            <AccountProfileHeader account={account} />
            <AccountProfileAccountEntries account={account} />
        </>
    )
}

const mapStateToProps = createStructuredSelector({
    accounts: selectAccounts
})

export default withRouter(connect(mapStateToProps)(AccountProfile))
