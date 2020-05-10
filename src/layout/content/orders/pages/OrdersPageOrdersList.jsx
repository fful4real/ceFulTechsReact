import React, { useState } from 'react'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'
import ListOrders from '../../../../components/list/ListOrders'
import PaginatorDefault from '../../../../components/pagination/pagination.default'
import { selectOrders, selectOrdersCurrentPage, selectIsFetchingOrdersPage, selectShouldFetchOrderPage, selectOdersTotalPages, selectOrdersPerPage, selectAllOrders, selectIsFetchingAllOrders } from '../../../../redux/orders/orders.selectors'
import { setOrdersCurrentPageAsync, fetchOrdersPageAsync, setShouldFetchOrderPageAsync } from '../../../../redux/orders/orders.actions'
import SearchForm from '../../../../components/form/search-form'
import { Link } from 'react-router-dom'
import { OrderListFormStyle } from './styles/order-list.style'
import { selectStatuses } from '../../../../redux/statuses/statuses.selectors'
import { uid } from 'react-uid'

const OrdersPageOrdersList = ({orders,
    pageCount, 
    fetchPage,
    setPage,
    startFetchPage,
    isFetching, 
    currentPage, 
    shouldFetchPage,
    ordersPerPage,
    statuses,
    allOrders,
    isFetchingAllOrders
})=> {
    
    if (!ordersPerPage[`page_${currentPage}`]) {
        !shouldFetchPage&&startFetchPage(true)
        shouldFetchPage&&fetchPage(currentPage)
        isFetching=true
    }else{
        isFetching=false
    }
    const [searchString, setSearchString] = useState('')
    const [status, setStatus] = useState('')
    orders = ordersPerPage[`page_${currentPage}`]
    const handleSearch = value => setSearchString(value)
    const handleSetPage = page => {
        setPage(page)
        setStatus('')
        setSearchString('')
    }

    if (orders) {
        if (status||searchString) {
            orders = allOrders
            isFetching = isFetchingAllOrders
        }
        orders = status?orders.filter(item=>
            (item.status.className.toLowerCase()===status.toLowerCase())
        ):orders

        orders = orders.filter(item=>
            (item.customer.firstName.toLowerCase().indexOf(searchString.toLowerCase())!==-1)||
            (item.customer.lastName.toLowerCase().indexOf(searchString.toLowerCase())!==-1)
        )
        
    }
    const statusClassName = 'text-'+status;
    // console.log(statusClassName)
    return (
        <div className="row">
            <div className="col-xl-12">
                <div className="hk-sec-wrapper">
                    <div className="d-flex justify-content-between align-items-center">
                        <h5 className="hk-sec-title">List of Orders</h5>
                        <OrderListFormStyle>
                            <div className="d-flex justify-content-between align-items-center">
                                <div className="select-orders">
                                    <div className="inline-block dropdown">
                                        <span className="dropdown-toggle no-caret" data-toggle="dropdown" aria-expanded="false" role="button">
                                            <i className={`ion ion-ios-analytics ${statusClassName}`}></i>
                                        </span>
                                        <div className="dropdown-menu dropdown-menu-right" x-placement="bottom-end" style={{position: "absolute", transform: "translate3d(13px, 21px, 0px)", top: "0px", left: "0px", willChange: "transform"}}>
                                        {statuses.map(statusMap=>
                                                (<Link key={`status-${uid(statusMap.id)}`} to="#" className={`dropdown-item ${status===statusMap.className?"text-success":''}`} onClick={()=>setStatus(statusMap.className)}>{statusMap.statusLabel}</Link>)
                                            )
                                        }
                                            <div className="dropdown-divider"></div>
                                            <Link className="dropdown-item" to="#" onClick={e=>setStatus('')}>View all Orders</Link>
                                        </div>
                                    </div>
                                </div>
                                <SearchForm handleSearch={handleSearch} searchString={searchString} />
                            </div>
                        </OrderListFormStyle>
                    </div>
                    <ListOrders tableData={orders} isFetching={isFetching} />
                    <PaginatorDefault currentPage={currentPage} pageCount={pageCount} setPage={page=>handleSetPage(page)} />
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
    statuses: selectStatuses,
    allOrders: selectAllOrders,
    isFetchingAllOrders: selectIsFetchingAllOrders,
})


const mapDispatchToProps = {
    setPage: setOrdersCurrentPageAsync,
    fetchPage: fetchOrdersPageAsync,
    startFetchPage:setShouldFetchOrderPageAsync
}

export default connect(mapStateToProps, mapDispatchToProps)(OrdersPageOrdersList)
