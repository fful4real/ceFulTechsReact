import React, { useState } from 'react'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'
import { selectLastTenCustomers, selectIsFetchingCustomers } from '../../../redux/customers/customers.selectors'
import ListCustomers from '../../../components/list/ListCustomers'

const LastTenCustomers = ({customers, isFetching})=> {
    const [currentPage, setCurrentPage] = useState(1)
    // console.log("Last Ten Customers: ", lastTenCustomers)
    return (
        <div className="row">
            <div className="col-xl-12">
                <div className="hk-sec-wrapper">
                    <h5 className="hk-sec-title">Last Ten Customers</h5>
                    <ListCustomers currentPage={currentPage} setPage={setCurrentPage} tableData={customers} isFetching={isFetching} />
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = createStructuredSelector({
    customers: selectLastTenCustomers,
    isFetching: selectIsFetchingCustomers
})

export default connect(mapStateToProps)(LastTenCustomers)
