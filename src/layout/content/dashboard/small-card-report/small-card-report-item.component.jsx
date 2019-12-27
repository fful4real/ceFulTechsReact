import React from 'react'

const SmallCardReportItem=({title, counterUp,value}) =>{

    return (
        <div className="col-lg-3 col-sm-6">
            <div className="card card-sm">
                <div className="card-body">
                    <span className="d-block font-11 font-weight-500 text-dark text-uppercase mb-10">{title? title: 'New projects this month'}</span>
                    <div className="d-flex align-items-center justify-content-between position-relative">
                        <div>
                            <span className="d-block">
                                <span className="display-5 font-weight-400 text-dark">$
                                    <span className={counterUp? 'counter-anim':''}>
                                        {value}
                                    </span>
                                </span>
                            </span>
                        </div>
                        <div className="position-absolute r-0 b-0 w-40">
                            <div id="spark1"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SmallCardReportItem;