import React from 'react'

const AccountBalanceReport = ()=>{

    return(
        <div className="col-lg-6 col-md-6">
                <div className="card card-sm">
                    <div className="card-body">
                        <div className="d-flex justify-content-between mb-5">
                            <div>
                                <span className="d-block font-15 text-dark font-weight-500">Account Balance XAF</span>
                            </div>
                            <div>
                                <span className="text-warning font-14 font-weight-500">+10%</span>
                            </div>
                        </div>
                        <div className="text-center">
                            <span className="d-block display-4 text-dark mb-5">
                                XAF <span className="counter-anim">23,983,563</span>
                            </span>
                            <small className="d-block">
                                172,458 Exact account balance
                            </small>
                        </div>
                    </div>
                </div>
            </div>
    )
}

export default AccountBalanceReport;