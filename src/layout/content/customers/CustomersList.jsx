import React, { useState } from 'react'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'
import { selectIsFetchingCustomers, selectCustomers, selectCustomersPendingOrders, selectCustomersOfTheMonth, selectCustomersPerPage } from '../../../redux/customers/customers.selectors'
import ListCustomers from '../../../components/list/ListCustomers'
import SearchForm from '../../../components/form/search-form'
import { selectCurrentPage } from '../../../redux/fultechs/FultechsSelectors'
import { Redirect } from 'react-router-dom'

const CustomersList = ({customers, currentPage, customersPerPage, isFetching, filterBy, customersPendingOrders, customersOfTheMonth})=> {
    
    const [searchString, setSearchString] = useState('')
    const handleSearch = value => setSearchString(value)
    const filterByText = {ofmonth:'of the month', pendingorders: 'pending orders'}
    switch (filterBy) {
        case 'ofmonth':
            customers = customersOfTheMonth
            break;
        case 'pendingorders':
            customers = customersPendingOrders
            break;
    
        default:
            break;
    }
    
    if (!customers) {
        return <Redirect to="/customers"/>
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
    customersPendingOrders: selectCustomersPendingOrders,
    customersOfTheMonth: selectCustomersOfTheMonth,
    customersPerPage: selectCustomersPerPage,
    currentPage: selectCurrentPage

})

export default connect(mapStateToProps)(CustomersList)
