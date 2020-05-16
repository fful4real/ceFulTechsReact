import React, { useState } from 'react'
import { numberWithCommas } from '../../helpers/helper'
import ListItems from './list-items'
import { Redirect } from 'react-router-dom'
import moment from 'moment'

const ListCustomers = ({tableData, isFetching, expandableRows=false, pagination=false}) =>{
    // console.log(tableData)
    const [itemPage, setItemPage] = useState(false)
    const handleRowClick = row => {
        console.log(row)
        setItemPage(row)
    }
    const columns = [
        {
            name:'Customer',
            selector: 'firstName',
            sortable:true,
            cell: row => <div onClick={()=>handleRowClick(row)}>
                            <i className="icon-user font-11 text-primary mr-5"></i>
                            <span className="text-capitalize-">{row.firstName}</span>
                            <span className="text-uppercase-">&nbsp;{row.lastName}</span>
                        </div>
        },
        {
            name:'Mobile Number',
            selector: 'mobileNumber',
            sortable:true,
            cell: row => <div onClick={()=>handleRowClick(row)}>
                            <i className="icon-phone font-11 text-success mr-5"></i>{row.mobileNumber}
                        </div>
        },
        {
            name:'Town',
            selector: 'fkcity',
            sortable:true,
            cell: row => <div onClick={()=>handleRowClick(row)}>
                            <span>{row.fkCity?row.fkCity.code:''}</span>
                        </div>
        },
        {
            name:'Orders Received',
            selector: 'CustomersOrders',
            sortable:true,
            cell: row => <div className="text-center" onClick={()=>handleRowClick(row)}>{numberWithCommas(row.CustomersOrders.length)}</div>
        },
        {
            name:'Orders Sent',
            selector: 'ordersByCustomer',
            sortable:true,
            cell: row => <div onClick={()=>handleRowClick(row)} className="text-center">{numberWithCommas(row.ordersByCustomer.length)}</div>
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
                        </div>
        }
    ]
    return itemPage? 
    (<Redirect to={`/customers/${itemPage.id}`}/>)
    : (
        <div>
            <ListItems pagination={pagination} expandableRows={expandableRows} columns={columns} data={tableData} isFetchingData={isFetching} handleRowClick={handleRowClick} /> 
        </div>
    )
}

export default ListCustomers
