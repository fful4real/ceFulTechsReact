import React from 'react'

const MediumCardReportItem = ({title})=>{

    return(
        <div className="col-lg-4">
            <div className="card">
                <div className="card-header card-header-action">
                    <div>
                        <h6 className="mb-10">{title}</h6>
                        <p className="font-14 w-80">Displaying the details of each {title} in a chart</p>
                    </div>
                </div>
                <div className="card-body">
                    <div id="e_chart_4" className="echart" style={{height:"260px"}}></div>
                    <div className="hk-legend-wrap mt-20 mb-5">
                        <div className="hk-legend">
                            <span className="d-10 bg-sky-light-3 rounded-circle d-inline-block"></span><span>C - FulTechs1 - 679233361</span>
                        </div>
                        <div className="hk-legend">
                            <span className="d-10 bg-yellow-light-4 rounded-circle d-inline-block"></span><span>Email Search</span>
                        </div>
                    </div>
                    <div className="hk-legend-wrap">
                        <div className="hk-legend">
                            <span className="d-10 bg-sky-light-2 rounded-circle d-inline-block"></span><span>MTNC - FulTechs2 - 670345486</span>
                        </div>
                        <div className="hk-legend">
                            <span className="d-10 bg-yellow-light-1 rounded-circle d-inline-block"></span><span>MTNP - FulTechs1 - 670345486</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MediumCardReportItem;