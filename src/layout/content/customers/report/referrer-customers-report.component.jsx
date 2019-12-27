import React from 'react'

const ReferredCustomersReport = ()=>{

    return(
        <div className="col-lg-4 col-md-6">
                <div className="card card-sm">
                    <div className="card-body">
                        <div className="d-flex justify-content-between mb-5">
                            <div>
                                <span className="d-block font-15 text-dark font-weight-500">Referrals of the month</span>
                            </div>
                            <div>
                                <span className="text-danger font-14 font-weight-500">-10%</span>
                            </div>
                        </div>
                        <div className="text-center">
                            <span className="d-block display-4 text-dark mb-5">53.2K</span>
                            <small className="d-block">37,645 Referrals for this month</small>
                        </div>
                    </div>
                </div>
            </div>
    )
}

export default ReferredCustomersReport;