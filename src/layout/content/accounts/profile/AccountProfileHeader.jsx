import React from 'react'
import avatar1 from '../../../../assets/img/gallery/bank.jpg'
import { CustomerProfileStyle } from '../../customers/styles/CustomerProfileStyle'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { setShowAccountsModalAttempt, setAccountsModalHeadingAttempt } from '../../../../redux/accounts/accounts.action'
import { createStructuredSelector } from 'reselect'
import { selectIsAppLoaded } from '../../../../redux/fultechs/FultechsSelectors'
import { numberWithCommas, getAccountEntries, getAccountEntriesAmount } from '../../../../helpers/helper'
import { selectAccountEntries } from '../../../../redux/accountEntries/AccountEntriesSelectors'

const AccountProfileHeader = ({appIsLoaded,accountEntries, setModal, setModalHeading, account})=> {
    let debitAccountEntries = [],
        creditAccountEntries = [],
        debitEntriesAmount = 0,
        creditEntriesAmount = 0
    if(accountEntries){
        debitAccountEntries = getAccountEntries(account,accountEntries,true)
        debitEntriesAmount = debitAccountEntries.length?getAccountEntriesAmount(debitAccountEntries):0

        creditAccountEntries = getAccountEntries(account,accountEntries,false)
        creditEntriesAmount = creditAccountEntries.length?getAccountEntriesAmount(creditAccountEntries):0
    }
    const totalEntries = {
        entriesCount: debitAccountEntries.length+creditAccountEntries.length,
        amount: debitEntriesAmount+creditEntriesAmount
    }
    console.log(debitAccountEntries)
    return (
        <div className="row">
            <div className="col-xl-12">
                <div className="hk-sec-wrapper">
                    <CustomerProfileStyle>
                        <div className="hk-row">
                            <div className="col-lg-6 d-flex justify-content-left">
                                <div className="media position-relative align-items-center profile-cover-content">
                                    {appIsLoaded&&<div className="modify-customer-profile position-absolute cursor-pointer" style={{top:0, right:'-20px'}}>
                                        <div className="inline-block dropdown">
                                            <span className="dropdown-toggle no-caret" data-toggle="dropdown" aria-expanded="false" role="button">
                                                <i className="ion ion-ios-settings "></i>
                                            </span>
                                            <div className="dropdown-menu dropdown-menu-right" x-placement="bottom-end">
                                                <Link to="#" className="dropdown-item" onClick={()=>setModal('modify')}>
                                                    <i className="dropdown-icon zmdi zmdi-edit"></i>
                                                    <span>Modify</span>
                                                </Link>
                                                <Link to="#" className="dropdown-item" onClick={()=>setModal('delete')}>
                                                    <i className="dropdown-icon zmdi zmdi-block text-danger"></i>
                                                    <span>Delete</span>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>}
                                    <div className="media-img-wrap  d-flex">
                                        <div className="customer-avatar avatar">
                                            <img src={avatar1} alt="user" className="avatar-img rounded-circle"></img>
                                        </div>
                                    </div>
                                    <div className="media-body">
                                        <div className="text-capitalize display-6 mb-5 font-weight-400">{account.code.toUpperCase()} - {account.accountType.name}</div>
                                        <div className="font-14 mb-5">
                                            <span className="mr-5">
                                                <span className="font-weight-500">
                                                    <i className="icon-wallet font-14 font-weight-400 mr-5"></i> Number:&nbsp;
                                                </span>
                                                <span className="mr-5 customer-profile-phone">{account.number}</span>
                                            </span>
                                        </div>
                                        <div className="font-14 mb-5">
                                            <span className="mr-5">
                                                <span className="font-weight-500">
                                                    <i className="icon-arrow-right font-14 text-success font-weight-500 mr-5"></i> Balance:&nbsp;
                                                </span>
                                                <span className="mr-5 profile-address">{numberWithCommas(account.balance)}&nbsp;{account.currency.currencyCode.toUpperCase()}</span>
                                            </span>
                                        </div>
                                       
                                        <div className={`font-14 mb-5 email`}>
                                                <span className="mr-5">
                                                    <span className="font-weight-500">
                                                        <i className="icon-briefcase font-14 text-primary font-weight-500 mr-5"></i> Bank:&nbsp;
                                                    </span>
                                                    <span className="mr-5">{account.bank.name}</span>
                                                </span>
                                            </div>
                                        </div>
                                        
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="card">
                                    <h6 className="bg-light card-header text-center">Total Entries: {totalEntries.entriesCount}</h6>
                                    
                                    <div className="row">
                                        <div className="col-lg-6">
                                            <ul className="list-group list-group-flush">
                                                <li className="list-group-item d-flex align-items-center justify-content-between" style={{minHeight:'73px'}}>
                                                    <span>
                                                        <span className="badge badge-success badge-pill mr-15">{creditAccountEntries.length}</span>Credits
                                                    </span>
                                                    <span>{numberWithCommas(creditEntriesAmount)}</span>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="col-lg-6">
                                            <ul className="list-group list-group-flush">
                                                <li className="list-group-item d-flex align-items-center justify-content-between" style={{minHeight:'73px'}}>
                                                    <span>
                                                        <span className="badge badge-warning badge-pill mr-15">{debitAccountEntries.length}</span>Debits
                                                    </span>
                                                    <span>{numberWithCommas(debitEntriesAmount)}</span>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CustomerProfileStyle>
                </div>
            </div>
        </div>
    )
}
const mapStateToProps = createStructuredSelector({
    appIsLoaded: selectIsAppLoaded,
    accountEntries: selectAccountEntries
})
const mapDispatchToProps = {
    setModal: setShowAccountsModalAttempt,
    setModalHeading: setAccountsModalHeadingAttempt
}
export default connect(mapStateToProps, mapDispatchToProps)(AccountProfileHeader)
