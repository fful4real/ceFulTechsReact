import React from 'react'
import { createStructuredSelector } from 'reselect';
import { selectCustomersPendingOrdersCount, selectIsFetchingCustomers } from '../../../../redux/customers/customers.selectors';
import { connect } from 'react-redux';
import { selectNotCompletedOrdersAmount, selectIsFetchingOrders } from '../../../../redux/orders/orders.selectors';
import { numberWithCommas } from '../../../../helpers/helper';
import SpinnerDisplay from '../../../../components/spinner/spinnerDisplay';
import DisplayReport from '../../../../components/report/display-report';

const CustomersPendingOrdersReport = ({isFetching, isFetchingOrders, pendingCustomers, pendingAmount})=>{

    return isFetching||isFetchingOrders?
    (
        <SpinnerDisplay title="Months Customers" displayClassName="col-lg-4 col-md-6"/>
    ):
        (
        <DisplayReport
            title = "Customers Pending Orders"
            value1={pendingCustomers}
            value2={numberWithCommas(pendingAmount)}
            subTitle="to be paid"
            incrementValue="+10"
            incrementClass="danger"
            linkTo = "/customers/pendingorders"
            displayClassName="col-lg-4 col-md-6"
        />
    )
}

const mapStateToProps = createStructuredSelector({
    pendingCustomers: selectCustomersPendingOrdersCount,
    pendingAmount: selectNotCompletedOrdersAmount,
    isFetching: selectIsFetchingCustomers,
    isFetchingOrders: selectIsFetchingOrders,
})

export default connect(mapStateToProps)(CustomersPendingOrdersReport);