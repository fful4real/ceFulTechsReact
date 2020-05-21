import React, { useState } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect';
import { selectAccounts, selectIsFetchingAccounts } from '../../../redux/accounts/accounts.selector';
import ListAccounts from '../../../components/list/ListAccounts';

const AccountsList = ({accounts, isFetching})=>{

    const [currentPage, setCurrentPage] = useState(1)

    return (
        <div className="row">
            <div className="col-xl-12">
                <div className="hk-sec-wrapper">
                    <div className="d-flex justify-content-between align-items-center">
                        <h5 className="hk-sec-title">Accounts List
                            <small className="text-muted pl-5">available</small>
                        </h5>
                    </div>
                    <ListAccounts currentPage={currentPage} setPage={setCurrentPage} tableData={accounts} isFetching={isFetching} />
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = createStructuredSelector({
    accounts: selectAccounts,
    isFetching: selectIsFetchingAccounts
})

export default connect(mapStateToProps)(AccountsList);