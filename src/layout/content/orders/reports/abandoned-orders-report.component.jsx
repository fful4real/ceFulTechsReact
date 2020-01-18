import React from 'react'
import SpinnerDisplay from '../../../../components/spinner/spinnerDisplay';
import DisplayReport from '../../../../components/report/display-report';
import { connect } from 'react-redux';
import { selectIsFetching, selectPendingOrdersCount,selectPendingOrdersAmount } from '../../../../redux/orders/orders.selectors';

const AbandonedOrdersReport = ({isFetching, theTitle="Pending Orders", ordersCount, pendingOrderAmount})=>{

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

const ordersState = rootReducerState =>({
    ordersCount:selectPendingOrdersCount(rootReducerState),
    pendingOrderAmount:selectPendingOrdersAmount(rootReducerState),
    isFetching: selectIsFetching(rootReducerState)
})

export default connect(ordersState)(AbandonedOrdersReport);