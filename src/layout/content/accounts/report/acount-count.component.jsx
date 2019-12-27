import React from 'react'

const AccountCountReport = ()=>{

    return(
        <div className="col-lg-6 col-md-6">
                <div className="card card-sm">
                    <div className="card-body">
                        <div className="d-flex justify-content-between mb-5">
                            <div>
                                <span className="d-block font-15 text-dark font-weight-500">Number Of Accounts</span>
                            </div>
                        </div>
                        <div className="text-center">
                            <span className="d-block display-4 text-dark mb-5">12</span>
                            <small className="d-block">All accounts</small>
                        </div>
                    </div>
                </div>
            </div>
    )
}

export default AccountCountReport;