import React from 'react'

const MonthsCustomerReport = ()=>{

    return(
        <div className="col-lg-4 col-md-6">
                <div className="card card-sm">
                    <div className="card-body">
                        <div className="d-flex justify-content-between mb-5">
                            <div>
                                <span className="d-block font-15 text-dark font-weight-500">Customers of the Month</span>
                            </div>
                            <div>
                                <span className="text-warning font-14 font-weight-500">+10%</span>
                            </div>
                        </div>
                        <div className="text-center">
                            <span className="d-block display-4 text-dark mb-5">23.7K</span>
                            <small className="d-block">172,458 Customers for the year</small>
                        </div>
                    </div>
                </div>
            </div>
    )
}

export default MonthsCustomerReport;