import React from 'react'
import { createStructuredSelector } from 'reselect';
import { selectCustomersPendingOrdersCount } from '../../../../redux/customers/customers.selectors';
import { connect } from 'react-redux';
import { selectNotCompletedOrdersAmount } from '../../../../redux/orders/orders.selectors';
import { numberWithCommas } from '../../../../helpers/helper';

const CustomersPendingOrdersReport = ({pendingCustomers, pendingAmount})=>{

    return(
        <div className="col-lg-4 col-md-6">
                <div className="card card-sm">
                    <div className="card-body">
                        <div className="d-flex justify-content-between mb-5">
                            <div>
                                <span className="d-block font-15 text-dark font-weight-500">Customers Pending Orders</span>
                            </div>
                            <div>
                                <span className="text-danger font-14 font-weight-500">-10%</span>
                            </div>
                        </div>
                        <div className="text-center">
                            <span className="d-block display-4 text-dark mb-5">{pendingCustomers}</span>
                            <small className="d-block"><span className="counter-anim">{numberWithCommas(pendingAmount)}</span> to be paid</small>
                        </div>
                    </div>
                </div>
            </div>
    )
}

const mapStateToProps = createStructuredSelector({
    pendingCustomers: selectCustomersPendingOrdersCount,
    pendingAmount: selectNotCompletedOrdersAmount
})

export default connect(mapStateToProps)(CustomersPendingOrdersReport);