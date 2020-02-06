import React, { useState } from 'react'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'
import { selectOrdersTableData, selectIsFetching } from '../../../../redux/orders/orders.selectors'
import DataTable from 'react-data-table-component'
import SearchForm from '../../../../components/form/search-form'
import { OrderListFormStyle } from './styles/order-list.style'
const  OrdersList = ({selectOrdersTableData,selectIsFetching})=> {
    console.log(selectOrdersTableData)
    const [searchString, setSearchString] = useState('')
    const handleSearch = value => setSearchString(value)
    const data = selectOrdersTableData.filter(item=>item.customer.toLowerCase().indexOf(searchString.toLowerCase())!==-1)
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
            cell: row => <div><i className="icon-user font-11 text-primary mr-5"></i>{row.customer}</div>
        },
        {
            name:'Amount In',
            selector: 'amountIn',
            sortable:true,
            cell: row => <div>
                            <i className="icon-arrow-up font-11 text-success mr-5"></i>{`${row.amountIn} ${row.currencyIn.currencyCode}`}
                        </div>
        },
        {
            name:'Amount Out',
            selector: 'amountOut',
            sortable:true,
            cell: row => <div>
                            <i className="icon-arrow-up font-11 text-danger mr-5"></i>{`${row.amountOut} ${row.currencyOut.currencyCode}`}
                        </div>
        },
        {
            name:'Status',
            selector: 'status',
            sortable:true,
            cell: row => <div><span className={`badge badge-soft-${row.statusClass}`}>{row.status}</span></div>
        },
        {
            name:'Created Date',
            selector: 'datec',
            sortable:true,
            cell: row => <div><span className="text-muted"><i className="icon-clock font-13"></i> {row.datec}</span></div>
        }
    ]
    return (
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
                                    progressPending={selectIsFetching}
                                    pagination={true}
                                    when={row=>alert(row)}
                                    fixedHeader={true}
                                    fixedHeaderScrollHeight="100vh"
                                    expandableRows={true}
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
    selectIsFetching
})

export default connect(ordersState)(OrdersList)
