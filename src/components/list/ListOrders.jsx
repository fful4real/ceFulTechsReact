import React, { useState } from 'react'
import { numberWithCommas } from '../../helpers/helper'
import ListItems from './list-items'
import { Redirect } from 'react-router-dom'
import moment from 'moment'

const ListOrders = ({tableData, isFetching, receivedFrom=false}) =>{
    const [itemPage, setItemPage] = useState(false)
    const handleRowClick = row => {
        setItemPage(row)
    }
    const columns = [
        {
            name:'Ref',
            selector: 'orderRef',
            sortable:true
        },
        {
            name:`${receivedFrom?'Sent By':'Customer'}`,
            selector: `${receivedFrom?'sentBy':'customer'}`,
            sortable:true,
            cell: row => <div onClick={()=>handleRowClick(row)}>
                            <i className="icon-user font-11 text-primary mr-5"></i>
                            <span className="text-capitalize-">{receivedFrom?row.sentBy.firstName:row.customer.firstName}</span>
                            <span className="text-uppercase-">&nbsp;{row.customer.lastName}</span>
                        </div>
        },
        {
            name:'Amount In',
            selector: 'amountIn',
            sortable:true,
            cell: row => <div onClick={()=>handleRowClick(row)}>
                            <i className="icon-arrow-down font-11 text-success mr-5"></i>{`${numberWithCommas(row.amountIn)} ${row.currencyIn.currencyCode}`}
                        </div>
        },
        {
            name:'Amount Out',
            selector: 'amountOut',
            sortable:true,
            cell: row => <div onClick={()=>handleRowClick(row)}>
                            <i className="icon-arrow-up font-11 text-danger mr-5"></i>{`${numberWithCommas(row.amountOut)} ${row.currencyOut.currencyCode}`}
                        </div>
        },
        {
            name:'Pending',
            selector: 'pendingAmount',
            sortable:true,
            cell: row => <div onClick={()=>handleRowClick(row)}>
                            <span>{`${numberWithCommas(row.pendingAmount)} ${row.currencyOut.currencyCode}`}</span>
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
            cell: row => <div onClick={()=>handleRowClick(row)}><span className="text-muted"><i className="icon-clock font-13"></i> {moment(row.datec).format("DD - MMM - YYYY")}</span></div>
        },
        {
            name:'Created By',
            selector: 'createdBy',
            sortable:true,
            cell: row => <div onClick={()=>handleRowClick(row)}>
                            <span className="text-capitalize-">{row.createdBy.firstName}</span>
                            <span className="text-uppercase-">&nbsp;{row.createdBy.lastName}</span>
                        </div>}
    ]
    return itemPage? 
    (<Redirect to={`/orders/${itemPage.id}`}/>)
    : (
        <div>
            <ListItems columns={columns} data={tableData} isFetchingData={isFetching} handleRowClick={handleRowClick} /> 
        </div>
    )
}

export default ListOrders
