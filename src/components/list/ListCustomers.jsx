import React, { useState } from 'react'
import { numberWithCommas, getPageCount, paginateResult } from '../../helpers/helper'
import ListItems from './list-items'
import { Redirect } from 'react-router-dom'
import moment from 'moment'
import PaginatorDefault from '../pagination/pagination.default'
import SearchForm from '../form/search-form'

const ListCustomers = ({tableData,currentPage, setPage,isFetching, expandableRows=false, pagination=false}) =>{
    // console.log(tableData)
    const [itemPage, setItemPage] = useState(false)
    const [searchString, setSearchString] = useState('')
    const handleSearch = value => setSearchString(value)
    const handleRowClick = row => {
        setItemPage(row)
    }    
    tableData = tableData.filter(data=>data?true:false)
    tableData = tableData.filter(tbData=>
        (tbData.firstName.toLowerCase().indexOf(searchString.toLowerCase())!==-1)||
        (tbData.lastName.toLowerCase().indexOf(searchString.toLowerCase())!==-1)||
        (tbData.mobileNumber.toLowerCase().indexOf(searchString.toLowerCase())!==-1)
    )
    const pageCount = getPageCount(tableData)
    tableData = paginateResult(tableData)
    tableData = tableData[`page_${currentPage}`]
    // console.log(getPageCount(tableData))
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
            <SearchForm handleSearch={handleSearch} searchString={searchString} searchPlaceHolder="Search Customer" />
            <ListItems expandableRows={expandableRows} columns={columns} data={tableData} isFetchingData={isFetching} handleRowClick={handleRowClick} />
            <div className="mb-10"></div>
            {pageCount>1&&<PaginatorDefault currentPage={currentPage} pageCount={pageCount} setPage={setPage} />}
        </div>
    )
}

export default ListCustomers
