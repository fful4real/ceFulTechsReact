import React from 'react'
import SmallCardReportItem from './small-card-report-item.component';
import { createStructuredSelector } from 'reselect';
import { selectOrdersPerMonth } from '../../../../redux/orders/orders.selectors';
import { connect } from 'react-redux';

const SmallCardReportList =({ordersPerMonth})=>{
    return(
        <div className="hk-row">
            <SmallCardReportItem title="Orders This Month" value="30" data={ordersPerMonth}/>
            <SmallCardReportItem title="Received This Month" counterUp="yes" value="124,509"/>
            <SmallCardReportItem title="Sent This Month" value="905" />
            <SmallCardReportItem />
        </div>
    )
}

const mapStateToProps = createStructuredSelector({
    ordersPerMonth: selectOrdersPerMonth
})

export default connect(mapStateToProps)(SmallCardReportList)
