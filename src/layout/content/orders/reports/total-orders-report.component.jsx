import React from 'react'
import { connect } from 'react-redux';
import { selectOrderCount, selectOrdersTotalAmount } from '../../../../redux/orders/orders.selectors';

const TotalCustomersReport = ({ordersCount,ordersTotalAmount})=>{

    console.log(ordersCount)
    
    return(
        <div className="col-lg-3 col-md-6">
                <div className="card card-sm">
                    <div className="card-body">
                        <div className="d-flex justify-content-between mb-5">
                            <div>
                                <span className="d-block font-15 text-dark font-weight-500">Total Orders</span>
                            </div>
                            <div>
                                <span className="text-success font-14 font-weight-500">+10%</span>
                            </div>
                        </div>
                        <div className="text-center">
                            <span className="d-block display-4 text-dark mb-5">{ordersCount}.6k</span>
                            <small className="d-block">{ordersTotalAmount} Orders for the month</small>
                        </div>
                    </div>
                </div>
            </div>
    )
}

const ordersState = rootReducerState =>({
    ordersCount:selectOrderCount(rootReducerState),
    ordersTotalAmount:selectOrdersTotalAmount(rootReducerState)
})

export default connect(ordersState)(TotalCustomersReport);