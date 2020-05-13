import React, { useEffect } from 'react'
import TotalCustomersReport from './reports/total-orders-report.component';
import ProcessedOrdersReport from './reports/processed-orders-report.component';
import PendingOrdersReportComponent from './reports/pending-orders-report.component';
import { fetchPendingOrdersAsync, fetchProcessedOrdersAsync, fetchNewOrdersAsync } from '../../../redux/orders/orders.actions';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectPendingOrdersCount } from '../../../redux/orders/orders.selectors';
import NewOrdersReportComponent from './reports/new-orders-report.component';

const OrdersReports = ({
    fetchPendingOrders, 
    fetchProcessedOrders,
    fetchNewOrders,
    pendingOrders
})=>{
    
    
    useEffect(() => {
        if (!pendingOrders) {
            fetchPendingOrders()
            fetchProcessedOrders()
            fetchNewOrders()
        }
    })

    return(
        <div className="hk-row">
            <TotalCustomersReport/>
            <NewOrdersReportComponent />
            <ProcessedOrdersReport />
            <PendingOrdersReportComponent />
        </div>
    )
}

const mapDispatchToProps = {
    fetchPendingOrders: fetchPendingOrdersAsync,
    fetchProcessedOrders: fetchProcessedOrdersAsync,
    fetchNewOrders: fetchNewOrdersAsync,
}


const mapStateToProps = createStructuredSelector({
    pendingOrders: selectPendingOrdersCount
})


export default connect(mapStateToProps,mapDispatchToProps)(OrdersReports);