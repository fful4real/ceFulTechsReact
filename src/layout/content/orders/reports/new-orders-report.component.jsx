import React from 'react'
import { selectNewOrdersCount, selectNewOrdersAmount, selectIsFetchingNewOrders } from '../../../../redux/orders/orders.selectors';
import { connect } from 'react-redux';
import DisplayReport from '../../../../components/report/display-report';
import SpinnerDisplay from '../../../../components/spinner/spinnerDisplay';
import { createStructuredSelector } from 'reselect';

const NewOrdersReport = ({isFetching,newOrdersCount, newOrdersAmount})=>{

    return isFetching?
        (
            <SpinnerDisplay title="New Orders"/>
        ):(
            <DisplayReport 
            title = "New Orders"
            value1={newOrdersCount}
            value2={newOrdersAmount}
            subTitle="Worth"
            incrementValue="-30"
            incrementClass="danger"
            
            />
            )
}

const ordersState = createStructuredSelector({
    newOrdersCount:selectNewOrdersCount,
    newOrdersAmount:selectNewOrdersAmount,
    isFetching: selectIsFetchingNewOrders
})

export default connect(ordersState)(NewOrdersReport);