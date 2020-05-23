import React, { useState } from 'react'
import { numberWithCommas, getPageCount, paginateResult, capitalizeFirstLetter } from '../../helpers/helper'
import ListItems from './list-items'
import { Redirect } from 'react-router-dom'
import moment from 'moment'
import PaginatorDefault from '../pagination/pagination.default'
import SearchForm from '../form/search-form'

const ListAccountEntries = ({tableData,currentPage, setPage,isFetching, expandableRows=false, isDebit=false}) =>{
    // console.log(tableData)
    const [itemPage, setItemPage] = useState(false)
    const [searchString, setSearchString] = useState('')
    const handleSearch = value => setSearchString(value)
    const handleRowClick = row => {
        setItemPage(row)
    }    
    tableData = tableData.filter(data=>data?true:false)
    
    const pageCount = getPageCount(tableData)
    tableData = paginateResult(tableData)
    tableData = tableData[`page_${currentPage}`]
    // console.log(getPageCount(tableData))
    const columns = [
        {
            name:'Code',
            selector: 'ceAccount',
            sortable:true,
            cell: row => <div>
                            <i className="icon-support font-11 text-secondary mr-5"></i>
                            <span className="text-uppercase-">{row.ceAccount.code}</span>
                        </div>
        },
        {
            name:'Amount',
            selector: 'amount',
            sortable:true,
            cell: row => <div>
                            <i className={`icon-arrow-${isDebit?'down':'up'} font-11 text-${isDebit?'danger':'success'} mr-5`}></i>
                            <span>{ numberWithCommas(row.amount)}&nbsp;{row.ceAccount.currency.currencyCode}</span>
                        </div>
        },
        {
            name:'From Order',
            selector: 'fromOrder',
            sortable:true,
            cell: row => <div>
                            {row.fromOrder?row.fromOrder.orderRef:''}
                        </div>
        },
        {
            name:'Customer',
            selector: 'fromOrder',
            sortable:true,
            cell: row => <div>
                            <i className="icon-user font-11 text-primary mr-5"></i>
                            <span className="text-capitalize-">{row.fromOrder?capitalizeFirstLetter(row.fromOrder.customer.firstName):''}</span>
                            <span className="text-uppercase-">&nbsp;{row.fromOrder?row.fromOrder.customer.lastName.toUpperCase():''}</span>
                        </div>
        },
        {
            name:'Created Date',
            selector: 'datec',
            sortable:true,
            cell: row => <div>
                            <span className="text-muted">
                                <i className="icon-clock font-13"></i> {moment(row.datec).format("DD - MMM - YYYY")}
                            </span>
                        </div>
        },
        {
            name:'Created By',
            selector: 'createdBy',
            sortable:true,
            cell: row => <div>
                            <i className="icon-user font-11 text-primary mr-5"></i>
                            <span className="text-capitalize-">{row.createdBy.firstName}</span>
                            <span className="text-uppercase-">&nbsp;{row.createdBy.lastName}</span>
                        </div>
        }
    ]
    return itemPage? 
    (<Redirect to={`/accounts/${itemPage.id}`}/>)
    : (
        <div>
            <SearchForm handleSearch={handleSearch} searchString={searchString} searchPlaceHolder="Search entry" />
            <ListItems expandableRows={expandableRows} columns={columns} data={tableData} isFetchingData={isFetching} handleRowClick={handleRowClick} />
            <div className="mb-10"></div>
            {pageCount>1&&<PaginatorDefault currentPage={currentPage} pageCount={pageCount} setPage={setPage} />}
        </div>
    )
}

export default ListAccountEntries
