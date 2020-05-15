import React, { useState } from 'react'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'
import { selectIsFetchingCustomers, selectCustomers } from '../../../redux/customers/customers.selectors'
import ListCustomers from '../../../components/list/ListCustomers'
import SearchForm from '../../../components/form/search-form'

const CustomersList = ({customers, isFetching})=> {
    // console.log("Last Ten Customers: ", customers)
    const [searchString, setSearchString] = useState('')
    const handleSearch = value => setSearchString(value)
    customers = customers.filter(customer=>
        (customer.firstName.toLowerCase().indexOf(searchString.toLowerCase())!==-1)||
        (customer.lastName.toLowerCase().indexOf(searchString.toLowerCase())!==-1)||
        (customer.mobileNumber.toLowerCase().indexOf(searchString.toLowerCase())!==-1)
    )
    return (
        <div className="row">
            <div className="col-xl-12">
                <div className="hk-sec-wrapper">
                    <div className="d-flex justify-content-between align-items-center">
                        <h5 className="hk-sec-title">Customers List</h5>
                        <SearchForm handleSearch={handleSearch} searchString={searchString} searchPlaceHolder="Search Customer" />
                    </div>
                    <ListCustomers pagination={true} tableData={customers} isFetching={isFetching} />
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = createStructuredSelector({
    customers: selectCustomers,
    isFetching: selectIsFetchingCustomers
})

export default connect(mapStateToProps)(CustomersList)
