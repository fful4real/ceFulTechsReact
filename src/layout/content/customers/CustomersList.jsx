import React, { useState } from 'react'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'
import { selectIsFetchingCustomers, selectCustomers, selectCustomersPendingOrders, selectCustomersOfTheMonth } from '../../../redux/customers/customers.selectors'
import ListCustomers from '../../../components/list/ListCustomers'
import SearchForm from '../../../components/form/search-form'

const CustomersList = ({customers, isFetching, filterBy, pendingOrders, ofMonth})=> {
    // console.log("Last Ten Customers: ", customers)
    const [searchString, setSearchString] = useState('')
    const handleSearch = value => setSearchString(value)
    const filterByText = {ofmonth:'of the month', pendingorders: 'pending orders'}
    switch (filterBy) {
        case 'ofmonth':
            customers = ofMonth
            break;
        case 'pendingorders':
            customers = pendingOrders
            break;
    
        default:
            break;
    }
    // console.log(ofMonth,filterBy)
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
                        <h5 className="hk-sec-title">Customers List
                            {filterBy&&<small className="text-muted pl-5">{filterByText[filterBy]}</small>}
                        </h5>
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
    isFetching: selectIsFetchingCustomers,
    pendingOrders: selectCustomersPendingOrders,
    ofMonth: selectCustomersOfTheMonth
})

export default connect(mapStateToProps)(CustomersList)
