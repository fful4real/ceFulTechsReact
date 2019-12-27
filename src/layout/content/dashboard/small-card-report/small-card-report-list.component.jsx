import React from 'react'
import SmallCardReportItem from './small-card-report-item.component';

const SmallCardReportList =()=>{
    return(
        <div className="hk-row">
            <SmallCardReportItem title="Orders This Month" value="30"/>
            <SmallCardReportItem title="Received This Month" counterUp="yes" value="124,509"/>
            <SmallCardReportItem title="Sent This Month" value="905" />
            <SmallCardReportItem />
        </div>
    )
}

export default SmallCardReportList;
