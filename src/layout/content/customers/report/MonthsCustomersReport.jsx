import React from 'react'
import { selectIsFetchingCustomers, selectCustomersOfTheMonthCount, selectAmountForMonthsCustomers } from '../../../../redux/customers/customers.selectors';
import { createStructuredSelector } from 'reselect';
import DisplayReport from '../../../../components/report/display-report';
import SpinnerDisplay from '../../../../components/spinner/spinnerDisplay';
import { connect } from 'react-redux';
import { selectIsFetchingOrders } from '../../../../redux/orders/orders.selectors';
import { numberWithCommas } from '../../../../helpers/helper';

const MonthsCustomerReport = ({isFetching,amount, monthCustomers, isFetchingOrders})=>{

    return isFetching||isFetchingOrders?
        (
            <SpinnerDisplay title="Months Customers" displayClassName="col-lg-4 col-md-6"/>
        ):(
            <DisplayReport 
                title = "Months Customers"
                value1={monthCustomers}
                value2={numberWithCommas(amount)}
                subTitle="Worth"
                incrementValue="-30"
                incrementClass="success"
                linkTo = "/customers/ofmonth"
                displayClassName="col-lg-4 col-md-6"
            />
        )
}

const mapStateToProps = createStructuredSelector({
    isFetching: selectIsFetchingCustomers,
    monthCustomers: selectCustomersOfTheMonthCount,
    isFetchingOrders: selectIsFetchingOrders,
    amount: selectAmountForMonthsCustomers
})

export default connect(mapStateToProps)(MonthsCustomerReport);