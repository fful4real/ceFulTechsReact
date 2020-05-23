import React,{ useState } from 'react'
import { createStructuredSelector } from 'reselect'
import { selectAccountEntries } from '../../../../redux/accountEntries/AccountEntriesSelectors'
import { connect } from 'react-redux'
import { getAccountEntries } from '../../../../helpers/helper'
import ListAccountEntries from '../../../../components/list/ListAccountEntries'

const AccountProfileAccountEntries = ({account, accountEntries})=> {
    let debitAccountEntries = [],
        hasDebits = false,
        debitCount = 0,
        [debitCurrentPage, setDebitCurrentPage] = useState(1),
        creditAccountEntries = [],
        hasCredits = false,
        creditsCount = 0,
        [creditCurrentPage, setCreditCurrentPage] = useState(1),
        hasAccountEntries = false

    if(accountEntries){
        accountEntries = accountEntries.filter(accountEntry=>accountEntry?true:false)
        debitAccountEntries = getAccountEntries(account,accountEntries,true)
        debitCount = debitAccountEntries.length
        hasDebits = debitCount?true:false
        
        creditAccountEntries = getAccountEntries(account,accountEntries,false)
        creditsCount = creditAccountEntries.length
        hasCredits = creditsCount?true:false
    }

    hasAccountEntries = hasCredits || hasDebits?true:false
    
    return (
        <React.Fragment>
            {hasAccountEntries&&
            <div className="hk-row">
                    {hasCredits&&
                    <div className="col-xl-12">
                        <div className="hk-sec-wrapper">
                            <h5 className="hk-sec-title">Entries
                                <small className="text-muted pl-10">credited&nbsp;({creditsCount})</small>
                            </h5>
                            <ListAccountEntries currentPage={creditCurrentPage} setPage={setCreditCurrentPage} tableData={creditAccountEntries} receivedFrom={true} />
                        </div>
                    </div>
                    }
                    {hasDebits&&
                    <div className="col-xl-12">
                        <div className="hk-sec-wrapper">
                            <h5 className="hk-sec-title">Entries
                            <small className="text-muted pl-10">debited ({debitCount})</small>
                            </h5>
                            <ListAccountEntries currentPage={debitCurrentPage} setPage={setDebitCurrentPage} tableData={debitAccountEntries} isDebit={true} />
                        </div>
                    </div>
                    }
            </div>}
        </React.Fragment>
    )
}

const mapStateToProps = createStructuredSelector({
    accountEntries:selectAccountEntries
})


export default connect(mapStateToProps)(AccountProfileAccountEntries)
