import React from 'react'
import SpinnerDisplay from '../../../../components/spinner/spinnerDisplay';
import DisplayReport from '../../../../components/report/display-report';
import { connect } from 'react-redux';
import { selectPendingOrdersCount,selectPendingOrdersAmount, selectIsFetchingPendingOrders } from '../../../../redux/orders/orders.selectors';
import { createStructuredSelector } from 'reselect';

const PendingOrdersReport = ({isFetching, theTitle="Pending Orders", ordersCount, pendingOrderAmount})=>{

    return isFetching?
        (
            <SpinnerDisplay title={theTitle} />
        ):(
            <DisplayReport
                title = {theTitle}
                value1={ordersCount}
                value2={pendingOrderAmount}
                subTitle=" pending"
                incrementValue="+77"
                incrementClass="info"
            />
    )
}

const ordersState = createStructuredSelector({
    ordersCount:selectPendingOrdersCount,
    pendingOrderAmount:selectPendingOrdersAmount,
    isFetching: selectIsFetchingPendingOrders
})

export default connect(ordersState)(PendingOrdersReport);