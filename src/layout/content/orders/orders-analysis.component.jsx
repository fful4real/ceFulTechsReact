import React from 'react'
import AnalysedOrders from './analysis/analysed-orders.component'
import BestOrders from './analysis/best-orders.component'

const OrdersAnalysis = ()=>{

    return(
        <div className="hk-row">
            <AnalysedOrders />
            <BestOrders />
        </div>
    )
}

export default OrdersAnalysis;