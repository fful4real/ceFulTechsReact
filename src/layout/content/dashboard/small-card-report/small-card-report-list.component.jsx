import React from 'react'
import SmallCardReportItem from './small-card-report-item.component';
import { createStructuredSelector } from 'reselect';
import { selectOrdersPerMonth, selectMonthsOrders } from '../../../../redux/orders/orders.selectors';
import { connect } from 'react-redux';

const SmallCardReportList =({ordersPerMonth, ordersOfMonth})=>{
    return(
        <div className="hk-row">
            <SmallCardReportItem title="Orders Per Month" value={ordersOfMonth.length} data={ordersPerMonth}/>
            <SmallCardReportItem title="Received This Month" counterUp="yes" value="124,509"/>
            <SmallCardReportItem title="Sent This Month" value="905" />
            <SmallCardReportItem />
        </div>
    )
}

const mapStateToProps = createStructuredSelector({
    ordersPerMonth: selectOrdersPerMonth,
    ordersOfMonth: selectMonthsOrders
})

export default connect(mapStateToProps)(SmallCardReportList)
