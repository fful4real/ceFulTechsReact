import React from 'react'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'
import { selectLastTenCustomers, selectIsFetchingCustomers } from '../../../redux/customers/customers.selectors'
import ListCustomers from '../../../components/list/ListCustomers'

const LastTenCustomers = ({customers, isFetching})=> {
    // console.log("Last Ten Customers: ", lastTenCustomers)
    return (
        <div className="row">
            <div className="col-xl-12">
                <div className="hk-sec-wrapper">
                    <h5 className="hk-sec-title">Last Ten Customers</h5>
                    <ListCustomers tableData={customers} isFetching={isFetching} />
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
