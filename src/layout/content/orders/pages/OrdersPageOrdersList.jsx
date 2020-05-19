import React, { useState } from 'react'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'
import ListOrders from '../../../../components/list/ListOrders'
import { selectOrders, selectIsFetchingOrdersPage, selectIsFetchingAllOrders } from '../../../../redux/orders/orders.selectors'

const OrdersPageOrdersList = ({
    orders,
    isFetching,
    isFetchingAllOrders,
    pagefilter
})=> {
    const [currentPage, setCurrentPage] = useState(1)
    const fetching = isFetching&&!isFetchingAllOrders
    // console.log(status)
    return (
        <div className="row">
            <div className="col-xl-12">
                <div className="hk-sec-wrapper">
                    <h5 className="hk-sec-title">List of Orders</h5>
                    <ListOrders pagefilter={pagefilter} currentPage={currentPage} isFetching={fetching} setPage={setCurrentPage} tableData={orders} />
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = createStructuredSelector({
    orders:selectOrders,
    isFetching: selectIsFetchingOrdersPage,
    isFetchingAllOrders: selectIsFetchingAllOrders,
})

export default connect(mapStateToProps)(OrdersPageOrdersList)
