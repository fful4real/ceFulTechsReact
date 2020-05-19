import React, { useState } from 'react'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'
import { selectIsFetchingCustomers, selectCustomers, selectCustomersPendingOrders, selectCustomersOfTheMonth } from '../../../redux/customers/customers.selectors'
import ListCustomers from '../../../components/list/ListCustomers'
import { Redirect } from 'react-router-dom'

const CustomersList = ({customers, isFetching, filterBy, customersPendingOrders, customersOfTheMonth})=> {
    
    const [currentPage, setCurrentPage] = useState(1)
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
    
    if (!customers.length) {
        return <Redirect to="/customers"/>
    }
    
    return (
        <div className="row">
            <div className="col-xl-12">
                <div className="hk-sec-wrapper">
                    <div className="d-flex justify-content-between align-items-center">
                        <h5 className="hk-sec-title">Customers List
                            {filterBy&&<small className="text-muted pl-5">{filterByText[filterBy]}</small>}
                        </h5>
                    </div>
                    <ListCustomers currentPage={currentPage} setPage={setCurrentPage} tableData={customers} isFetching={isFetching} />
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
})

export default connect(mapStateToProps)(CustomersList)
