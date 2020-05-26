import React, { useState } from 'react'
import { numberWithCommas, getPageCount, paginateResult } from '../../helpers/helper'
import ListItems from './list-items'
import { Redirect, Link } from 'react-router-dom'
import moment from 'moment'
import PaginatorDefault from '../pagination/pagination.default'
import SearchForm from '../form/search-form'
import { uid } from 'react-uid'
import { selectStatuses } from '../../redux/statuses/statuses.selectors'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { selectIsAppLoaded } from '../../redux/fultechs/FultechsSelectors'
import { Dropdown } from 'react-bootstrap'

const ListOrders = ({tableData,appIsLoaded,pagefilter='',statuses, isFetching, receivedFrom=false, expandableRows=false}) =>{
    const [searchString, setSearchString] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [itemPage, setItemPage] = useState(false)
    if (pagefilter) {
        pagefilter = statuses.filter(status_i=>status_i.statusCode===pagefilter)[0]
    }
    const [status, setStatus] = useState(pagefilter)
    const handleSearch = value => setSearchString(value)
    const setPage = page => setCurrentPage(page)
    const handleRowClick = row =>setItemPage(row)
    tableData = tableData.filter(data=>data?true:false)
    let statusFilter = []

    tableData.map(data=>{
        statusFilter[data.status.statusCode]=data.status.statusCode
        return data
    })
    
    statuses = statuses.filter(status1=>statusFilter[status1.statusCode]?true:false)
    tableData = status?tableData.filter(item=>
        (item.status.className.toLowerCase()===status.className.toLowerCase())
        ):tableData
    if (receivedFrom) {
        // console.log(tableData)
        tableData = tableData.filter(item=>{
            if(item.sentBy){
                return (item.sentBy.firstName.toLowerCase().indexOf(searchString.toLowerCase())!==-1)||
                (item.sentBy.lastName.toLowerCase().indexOf(searchString.toLowerCase())!==-1)
            }
            if(searchString){
                return false
            }else{
                return true
            }
        }
        )
    }else{
        tableData = tableData.filter(item=>
            (item.customer.firstName.toLowerCase().indexOf(searchString.toLowerCase())!==-1)||
            (item.customer.lastName.toLowerCase().indexOf(searchString.toLowerCase())!==-1)
        )
    }
    const pageCount = getPageCount(tableData)
    if (!status) {
        tableData = paginateResult(tableData)
        tableData = tableData[`page_${currentPage}`]
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
                            <span className="text-capitalize-">{receivedFrom?(row.sentBy?row.sentBy.firstName:'Not Mentioned'):row.customer.firstName}</span>
                            <span className="text-uppercase-">&nbsp;{receivedFrom?(row.sentBy?row.sentBy.lastName:'Not Mentioned'):row.customer.lastName}</span>
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
    const statusClassName = status?'text-'+status.className:'';
    

    return itemPage? 
    (<Redirect to={`/orders/${itemPage.id}`}/>)
    : (
        <div>
            {appIsLoaded&&<div className="d-flex justify-content-end align-items-center">
                <div className="select-orders mr-10 cursor-pointer">
                    <Dropdown>
                    <div className="inline-block dropdown">
                        <span className="dropdown-toggle no-caret" data-toggle="dropdown" aria-expanded="false" role="button">
                            <i className={`ion ion-ios-analytics ${statusClassName}`} style={{fontSize:"1.5em"}}></i>
                        </span>
                        <div className="dropdown-menu dropdown-menu-right" x-placement="bottom-end" style={{position: "absolute", transform: "translate3d(13px, 21px, 0px)", top: "0px", left: "0px", willChange: "transform"}}>
                        {statuses.map(statusMap=>
                                (<Link 
                                    key={`status-${uid(statusMap.id)}`} 
                                    to="#" 
                                    className={`dropdown-item ${status?status.className===statusMap.className?"text-success":'':''}`} 
                                    onClick={()=>setStatus(statusMap)}>{statusMap.statusLabel}
                                </Link>)
                            )
                        }
                            <div className="dropdown-divider"></div>
                            <Link className="dropdown-item" to="#" onClick={e=>setStatus('')}>View all Orders</Link>
                        </div>
                    </div>
                </Dropdown>
                </div>
                <SearchForm handleSearch={handleSearch} searchString={searchString} searchPlaceHolder="Search order" />
            </div>}
                <ListItems expandableRows={expandableRows} columns={columns} data={tableData} isFetchingData={isFetching} handleRowClick={handleRowClick} />
            <div className="mb-10"></div>
            {pageCount>1&&<PaginatorDefault currentPage={currentPage} pageCount={pageCount} setPage={setPage} />}
        </div>
    )
}
const mapStateToProps = createStructuredSelector({
    statuses: selectStatuses,
    appIsLoaded: selectIsAppLoaded
})
export default connect(mapStateToProps)(ListOrders)
