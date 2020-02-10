import React from 'react'
import { selectIsFetchingOrders, selectProcessedOrdersCount, selectProcessedOrdersAmount } from '../../../../redux/orders/orders.selectors'
import { connect } from 'react-redux'
import DisplayReport from '../../../../components/report/display-report'
import SpinnerDisplay from '../../../../components/spinner/spinnerDisplay'

const ProcessedOrdersReport = ({isFetching,ordersCount, processOrderAmount})=>{

    return isFetching?
        (
            <SpinnerDisplay title="Total Orders" />
        ):(
            <DisplayReport
                title = "Processed Orders"
                value1={ordersCount}
                value2={processOrderAmount}
                subTitle=" processed"
                incrementValue="+13"
                incrementClass="warning"
            />
    )
}

const ordersState = rootReducerState =>({
    ordersCount:selectProcessedOrdersCount(rootReducerState),
    processOrderAmount:selectProcessedOrdersAmount(rootReducerState),
    isFetching: selectIsFetchingOrders(rootReducerState)
})

export default connect(ordersState)(ProcessedOrdersReport);