import React from 'react'
import { selectIsFetchingOrders, selectOrderCountOfMonth, selectAmountForMonthOrders } from '../../../../redux/orders/orders.selectors';
import { connect } from 'react-redux';
import DisplayReport from '../../../../components/report/display-report';
import SpinnerDisplay from '../../../../components/spinner/spinnerDisplay';

const MonthsOrdersReport = ({isFetching,ordersCountOfMonth, ordersAmountOfMonth})=>{

    return isFetching?
        (
            <SpinnerDisplay title="Orders of the Month"/>
        ):(
            <DisplayReport 
            title = "Orders of the Month"
            value1={ordersCountOfMonth}
            value2={ordersAmountOfMonth}
            subTitle="for this month"
            incrementValue="-30"
            incrementClass="danger"
            
            />
            )
}

const ordersState = rootReducerState =>({
    ordersCountOfMonth:selectOrderCountOfMonth(rootReducerState),
    ordersAmountOfMonth:selectAmountForMonthOrders(rootReducerState),
    isFetching: selectIsFetchingOrders(rootReducerState)
})

export default connect(ordersState)(MonthsOrdersReport);