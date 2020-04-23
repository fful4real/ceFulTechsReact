import React from 'react'
import { connect } from 'react-redux';
import { selectOrderCount, selectOrdersTotalAmount, selectIsFetchingOrders } from '../../../../redux/orders/orders.selectors';
import DisplayReport from '../../../../components/report/display-report';
import SpinnerDisplay from '../../../../components/spinner/spinnerDisplay';

const TotalCustomersReport = ({ordersCount,ordersTotalAmount, isFetching})=>{
    
    return isFetching?
        (
            <SpinnerDisplay title="Total Orders" />
        ):(
            <DisplayReport
                title = "Total Orders"
                value1={ordersCount}
                value2={ordersTotalAmount}
                subTitle="for all orders"
                incrementValue="+50"
                incrementClass="success"
            />
    )
}

const ordersState = rootReducerState =>({
    ordersCount:selectOrderCount(rootReducerState),
    ordersTotalAmount:selectOrdersTotalAmount(rootReducerState),
    isFetching: selectIsFetchingOrders(rootReducerState)
})

export default connect(ordersState)(TotalCustomersReport);