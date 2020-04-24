import React, { useState } from 'react'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'
import { selectOrdersTableData, selectIsFetchingOrders } from '../../../../redux/orders/orders.selectors'
import DataTable from 'react-data-table-component'
import SearchForm from '../../../../components/form/search-form'
import { OrderListFormStyle } from './styles/order-list.style'
import { Redirect } from 'react-router-dom'
const  OrdersList = ({selectOrdersTableData,selectIsFetchingOrders})=> {
    // console.log(selectOrdersTableData)
    const [searchString, setSearchString] = useState('')
    const [itemPage, setItemPage] = useState(false)
    const handleSearch = value => setSearchString(value)
    const handleRowClick = row => {
        setItemPage(row)
    }
    const data = selectOrdersTableData.filter(item=>
            (item.customer.firstName.toLowerCase().indexOf(searchString.toLowerCase())!==-1)||
            (item.customer.lastName.toLowerCase().indexOf(searchString.toLowerCase())!==-1)
        )
    const columns = [
        {
            name:'Ref',
            selector: 'orderRef',
            sortable:true
        },
        {
            name:'Customer',
            selector: 'customer',
            sortable:true,
            cell: row => <div onClick={()=>handleRowClick(row)}>
                            <i className="icon-user font-11 text-primary mr-5"></i>
                            <span className="text-capitalize-">{row.customer.firstName}</span>
                            <span className="text-uppercase-">&nbsp;{row.customer.lastName}</span>
                        </div>
        },
        {
            name:'Amount In',
            selector: 'amountIn',
            sortable:true,
            cell: row => <div onClick={()=>handleRowClick(row)}>
                            <i className="icon-arrow-down font-11 text-success mr-5"></i>{`${row.amountIn} ${row.currencyIn.currencyCode}`}
                        </div>
        },
        {
            name:'Amount Out',
            selector: 'amountOut',
            sortable:true,
            cell: row => <div onClick={()=>handleRowClick(row)}>
                            <i className="icon-arrow-up font-11 text-danger mr-5"></i>{`${row.amountOut} ${row.currencyOut.currencyCode}`}
                        </div>
        },
        {
            name:'Pending',
            selector: 'pendingAmount',
            sortable:true,
            cell: row => <div onClick={()=>handleRowClick(row)}>
                            <span>{`${row.pendingAmount} ${row.currencyOut.currencyCode}`}</span>
                        </div>
        },
        {
            name:'Status',
            selector: 'status',
            sortable:true,
            cell: row => <div onClick={()=>handleRowClick(row)}><span className={`badge badge-soft-${row.status.className}`}>{row.status.statusLabel}</span></div>
        },
        {
            name:'Created Date',
            selector: 'datec',
            sortable:true,
            cell: row => <div onClick={()=>handleRowClick(row)}><span className="text-muted"><i className="icon-clock font-13"></i> {row.datec}</span></div>
        }
    ]
    return itemPage? 
    (<Redirect to={`/orders/${itemPage.id}`}/>)
    :
     (
        <div className="row">
            <div className="col-xl-12">
                <div className="hk-sec-wrapper">
                    <h5 className="hk-sec-title">Orders List</h5>
                    <OrderListFormStyle>
                        <SearchForm handleSearch={handleSearch} searchPlaceHolder="Search customer" />
                    </OrderListFormStyle>
                    <div className="row">
                        <div className="col-sm">
                            <div className="table-wrap" id="orderTable">
                                <DataTable
                                    columns={columns}
                                    data={data}
                                    highlightOnHover={true}
                                    striped={true}
                                    pointerOnHover={true}
                                    responsive={true}
                                    progressPending={selectIsFetchingOrders}
                                    pagination={true}
                                    when={row=>alert(row)}
                                    fixedHeader={true}
                                    fixedHeaderScrollHeight="100vh"
                                    expandableRows={true}
                                    onRowClicked={handleRowClick}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const ordersState = createStructuredSelector({
    selectOrdersTableData,
    selectIsFetchingOrders
})

export default connect(ordersState)(OrdersList)
