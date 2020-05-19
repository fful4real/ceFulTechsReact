import React, { useState } from 'react'
import ListOrders from '../../../../components/list/ListOrders'
import { createStructuredSelector } from 'reselect'
import { selectLastTenOrders } from '../../../../redux/orders/orders.selectors'
import { connect } from 'react-redux'

const OrdersPageLastTenOrders = ({lastTenOrders})=> {
    const [currentPage, setCurrentPage] = useState(1)
    // console.log("Last Ten Orders: ", lastTenOrders)
    return (
        <div className="row">
            <div className="col-xl-12">
                <div className="hk-sec-wrapper">
                    <h5 className="hk-sec-title">Last Ten Orders</h5>
                    <ListOrders currentPage={currentPage} setPage={setCurrentPage} tableData={lastTenOrders} />
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = createStructuredSelector({
    lastTenOrders:selectLastTenOrders
})

export default connect(mapStateToProps)(OrdersPageLastTenOrders)
