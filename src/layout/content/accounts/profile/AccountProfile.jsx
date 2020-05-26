import React from 'react'
import { connect } from 'react-redux'
import { withRouter, Redirect } from 'react-router-dom'
import { createStructuredSelector } from 'reselect'
import AccountProfileHeader from './AccountProfileHeader'
import AccountProfileAccountEntries from './AccountProdileAccountEntries'
import { selectAccounts } from '../../../../redux/accounts/accounts.selector'
import { setCurrentAccountAttempt } from '../../../../redux/accounts/accounts.action'

const AccountProfile = ({accounts, match, setAccount})=> {
    if (!accounts) {
        return <Redirect to="/accounts" />
    }
    const account = accounts.filter(account=>parseInt(account.id)===parseInt(match.params.id))[0]
    if (!account) {
        return <Redirect to="/accounts" />
    }

    setAccount(account.id)
    
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

const mapDispatchToProps = {
    setAccount: setCurrentAccountAttempt
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AccountProfile))
