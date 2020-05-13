import React from 'react'
import ListOrders from '../../../../components/list/ListOrders'
import { createStructuredSelector } from 'reselect'
import { selectOrders, selectOrdersCurrentPage, selectIsFetchingOrdersPage, selectShouldFetchOrderPage, selectOdersTotalPages, selectOrdersPerPage, selectIsFetchingAllOrders } from '../../../../redux/orders/orders.selectors'
import { connect } from 'react-redux'
import PaginatorDefault from '../../../../components/pagination/pagination.default'
import { setOrdersCurrentPageAsync, fetchOrdersPageAsync, setShouldFetchOrderPageAsync } from '../../../../redux/orders/orders.actions'

const OrdersList = ({orders,
    pageCount, 
    fetchPage,
    setPage,
    startFetchPage,
    isFetching, 
    currentPage, 
    shouldFetchPage,
    ordersPerPage,
    isFetchingAllOrders
})=> {
    
    if (!ordersPerPage[`page_${currentPage}`]) {
        !shouldFetchPage&&startFetchPage(true)
        shouldFetchPage&&fetchPage(currentPage)
        isFetching=true
    }else{
        isFetching=false
    }
    const fetching = isFetchingAllOrders?false:true
    orders = ordersPerPage[`page_${currentPage}`]
    return (
        <div className="row">
            <div className="col-xl-12">
                <div className="hk-sec-wrapper">
                    <h5 className="hk-sec-title">List of Orders--</h5>
                    <ListOrders tableData={orders} isFetching={fetching} />
                    <PaginatorDefault currentPage={currentPage} pageCount={pageCount} setPage={setPage} />
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = createStructuredSelector({
    orders:selectOrders,
    currentPage: selectOrdersCurrentPage,
    isFetching: selectIsFetchingOrdersPage,
    shouldFetchPage: selectShouldFetchOrderPage,
    pageCount: selectOdersTotalPages,
    ordersPerPage: selectOrdersPerPage,
    isFetchingAllOrders: selectIsFetchingAllOrders
})


const mapDispatchToProps = {
    setPage: setOrdersCurrentPageAsync,
    fetchPage: fetchOrdersPageAsync,
    startFetchPage:setShouldFetchOrderPageAsync
}

export default connect(mapStateToProps, mapDispatchToProps)(OrdersList)
