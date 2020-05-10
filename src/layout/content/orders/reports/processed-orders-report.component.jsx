import React from 'react'
import { selectProcessedOrdersCount, selectProcessedOrdersAmount, selectIsFetchingProcessedOrders } from '../../../../redux/orders/orders.selectors'
import { connect } from 'react-redux'
import DisplayReport from '../../../../components/report/display-report'
import SpinnerDisplay from '../../../../components/spinner/spinnerDisplay'
import { createStructuredSelector } from 'reselect'

const ProcessedOrdersReport = ({isFetching,ordersCount, processOrderAmount})=>{

    return isFetching?
        (
            <SpinnerDisplay title="Processed Orders" />
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

const ordersState = createStructuredSelector({
    ordersCount:selectProcessedOrdersCount,
    processOrderAmount:selectProcessedOrdersAmount,
    isFetching: selectIsFetchingProcessedOrders
})

export default connect(ordersState)(ProcessedOrdersReport);