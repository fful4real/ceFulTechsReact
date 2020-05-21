import React, { useState } from 'react'
import { numberWithCommas, getPageCount, paginateResult } from '../../helpers/helper'
import ListItems from './list-items'
import { Redirect } from 'react-router-dom'
import moment from 'moment'
import PaginatorDefault from '../pagination/pagination.default'
import SearchForm from '../form/search-form'

const ListAccounts = ({tableData,currentPage, setPage,isFetching, expandableRows=false, pagination=false}) =>{
    // console.log(tableData)
    const [itemPage, setItemPage] = useState(false)
    const [searchString, setSearchString] = useState('')
    const handleSearch = value => setSearchString(value)
    const handleRowClick = row => {
        setItemPage(row)
    }    
    tableData = tableData.filter(data=>data?true:false)
    tableData = tableData.filter(tbData=>
        (tbData.name.toLowerCase().indexOf(searchString.toLowerCase())!==-1)||
        (tbData.code.toLowerCase().indexOf(searchString.toLowerCase())!==-1)||
        (tbData.bank.name.toLowerCase().indexOf(searchString.toLowerCase())!==-1)||
        (tbData.number.toLowerCase().indexOf(searchString.toLowerCase())!==-1)
    )
    const pageCount = getPageCount(tableData)
    tableData = paginateResult(tableData)
    tableData = tableData[`page_${currentPage}`]
    // console.log(getPageCount(tableData))
    const columns = [
        {
            name:'Code',
            selector: 'code',
            sortable:true,
            cell: row => <div onClick={()=>handleRowClick(row)}>
                            <i className="icon-support font-11 text-secondary mr-5"></i>
                            <span className="text-uppercase-">{row.code}</span>
                        </div>
        },
        {
            name:'Name',
            selector: 'name',
            sortable:true,
            cell: row => <div onClick={()=>handleRowClick(row)}>
                            {row.name}
                        </div>
        },
        {
            name:'Balance',
            selector: 'balance',
            sortable:true,
            cell: row => <div onClick={()=>handleRowClick(row)}>
                            <i className="icon-arrow-right font-11 text-success mr-5"></i>{numberWithCommas(row.balance)}&nbsp;{row.currency.currencyCode}
                        </div>
        },
        {
            name:'Number',
            selector: 'number',
            sortable:true,
            cell: row => <div onClick={()=>handleRowClick(row)}>
                            <i className="icon-wallet font-11 text-success mr-5"></i><span>{row.number}</span>
                        </div>
        },
        {
            name:'Bank',
            selector: 'bank',
            sortable:true,
            cell: row => <div onClick={()=>handleRowClick(row)}>
                            <i className="icon-briefcase font-11 text-primary mr-5"></i>{row.bank.name}
                        </div>
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
    (<Redirect to={`/accounts/${itemPage.id}`}/>)
    : (
        <div>
            <SearchForm handleSearch={handleSearch} searchString={searchString} searchPlaceHolder="Search account" />
            <ListItems expandableRows={expandableRows} columns={columns} data={tableData} isFetchingData={isFetching} handleRowClick={handleRowClick} />
            <div className="mb-10"></div>
            {pageCount>1&&<PaginatorDefault currentPage={currentPage} pageCount={pageCount} setPage={setPage} />}
        </div>
    )
}

export default ListAccounts
