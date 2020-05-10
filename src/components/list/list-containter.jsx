import React, { useState } from 'react'
import { Redirect, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { uid } from 'react-uid'
import { numberWithCommas } from '../../helpers/helper'
import { OrderListFormStyle } from '../../layout/content/orders/pages/styles/order-list.style'
import SearchForm from '../form/search-form'
import ListItems from './list-items'
import { createStructuredSelector } from 'reselect'
import { selectStatuses } from '../../redux/statuses/statuses.selectors'
const  ListContainer = ({data,isFetchingData, listTitle,statuses})=> {
    // console.log("data : ", data)
    const [searchString, setSearchString] = useState('')
    const [itemPage, setItemPage] = useState(false)
    const [searchStatus, setSearchStatus] = useState('')
    const handleSearch = value => setSearchString(value)
    const handleRowClick = row => {
        setItemPage(row)
    }
    
    const handleStatus = statusCode =>{
        // console.log("statusCode: ", statusCode)
        setSearchStatus(statusCode)
    }
    data = searchStatus?data.filter(item=>
            (item.status.statusCode.toLowerCase()===searchStatus.toLowerCase())
        ):data
    // console.log("Second Data: ", searchStatus)
    data = data.filter(item=>
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
            cell: row => <div onClick={()=>handleRowClick(row)}><span className="text-muted"><i className="icon-clock font-13"></i> {row.datec}</span></div>
        }
    ]
    return itemPage? 
    (<Redirect to={`/orders/${itemPage.id}`}/>)
    :
     (
        <React.Fragment>
            <h5 className="hk-sec-title">{listTitle}</h5>
            <OrderListFormStyle>
                <div className="select-orders d-flex align-items-center card-action-wrap">
                    <div className="inline-block dropdown">
                        <span className="dropdown-toggle no-caret" data-toggle="dropdown" aria-expanded="false" role="button">
                            <i className="ion ion-ios-analytics"></i>
                        </span>
                        <div className="dropdown-menu dropdown-menu-right" x-placement="bottom-end" style={{position: "absolute", transform: "translate3d(13px, 21px, 0px)", top: "0px", left: "0px", willChange: "transform"}}>
                            {statuses.map(status=>
                                (<Link key={`status-${uid(status.id)}`} to="#" className={`dropdown-item ${searchStatus===status.statusCode?"text-success":''}`} onClick={e=>handleStatus(status.statusCode)}>{status.statusLabel}</Link>)
                            )}
                            <div className="dropdown-divider"></div>
                            <Link className="dropdown-item" to="#" onClick={e=>handleStatus('')}>View all Orders</Link>
                        </div>
                    </div>
                </div>
                <SearchForm handleSearch={handleSearch} searchPlaceHolder="Search customer" />
            </OrderListFormStyle>
            <ListItems columns={columns} data={data} isFetchingData={isFetchingData} handleRowClick={handleRowClick} />   
        </React.Fragment>
    )
}

const mapStateToProps = createStructuredSelector({
    statuses:selectStatuses
})

export default connect(mapStateToProps)(ListContainer)
