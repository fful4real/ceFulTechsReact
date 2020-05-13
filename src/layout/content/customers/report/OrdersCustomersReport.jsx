import React from 'react'

const OrdersCustomersReport = ()=>{

    return(
        <div className="col-lg-4 col-md-6">
                <div className="card card-sm">
                    <div className="card-body">
                        <div className="d-flex justify-content-between mb-5">
                            <div>
                                <span className="d-block font-15 text-dark font-weight-500">Customers Orders</span>
                            </div>
                            <div>
                                <span className="text-success font-14 font-weight-500">-1%</span>
                            </div>
                        </div>
                        <div className="text-center">
                            <span className="d-block display-4 text-dark mb-5">0.5K</span>
                            <small className="d-block">1879 Customers for the month</small>
                        </div>
                    </div>
                </div>
            </div>
    )
}

export default OrdersCustomersReport;