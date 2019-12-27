import React from 'react'
import MediumCardReportItem from './medium-card-report-item.component';

const MediumCardReportList = ()=>{

    return(
        <div className="hk-row">
            <MediumCardReportItem title="Accounts"/>
            <MediumCardReportItem title="Marketing"/>
            <MediumCardReportItem title="Procurement"/>
        </div>
    )
}

export default MediumCardReportList;