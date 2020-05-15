import React from 'react'
import { connect } from 'react-redux';
import { selectTotalOrders, selectOrdersTotalAmount, selectIsFetchingOrders } from '../../../../redux/orders/orders.selectors';
import DisplayReport from '../../../../components/report/display-report';
import SpinnerDisplay from '../../../../components/spinner/spinnerDisplay';
import { createStructuredSelector } from 'reselect';

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
                linkTo="/orders/list"
            />
    )
}

const ordersState = createStructuredSelector({
    ordersCount:selectTotalOrders,
    ordersTotalAmount:selectOrdersTotalAmount,
    isFetching: selectIsFetchingOrders
})

export default connect(ordersState)(TotalCustomersReport);