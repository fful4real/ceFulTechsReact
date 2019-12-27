import React from 'react'
import CustomerItem from './customer-item.component'


import IosPinOutline from 'react-ionicons/lib/IosPinOutline'
import IosSearch from 'react-ionicons/lib/IosSearch'
import IosPersonOutline from 'react-ionicons/lib/IosPersonOutline'
import IosCashOutline from 'react-ionicons/lib/IosCashOutline'
import IosCalendarOutline from 'react-ionicons/lib/IosCalendarOutline'
import IosPaperOutline from 'react-ionicons/lib/IosPaperOutline'


import {uid} from 'react-uid'

import CustomersData from './customers.data'

const CustomersList = ()=>{

    return(
        <div className="card">
            <div className="card-header card-header-action">
                <h6>Last ten Customers<small className="text-muted pl-10">for today</small></h6>
                <div className="d-flex align-items-center card-action-wrap">
                    <form action="/" role="search" className="email-search search-form">
                        <div className="input-group">
                            <input type="text" className="form-control" placeholder="Search"/>
                            <div className="input-group-append">
                                <div className="feather-icon">
                                    <IosSearch className="ion" color="#848d91" />
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <div className="card-body">
                <div className="table-wrap">
                    <div className="table-responsive">
                        <table className="table table-sm table-hover mb-0 list-table" data-tablesaw-mode="swipe" data-tablesaw-sortable data-tablesaw-sortable-switch data-tablesaw-minimap data-tablesaw-mode-switch>
                            <thead>
                                <tr>
                                    <th><IosPersonOutline/> <span>Customer Name</span></th>
                                    <th><IosPinOutline/><span> Address</span></th>
                                    <th><IosCashOutline/><span> Amount</span></th>
                                    <th><IosPaperOutline/><span> Orders</span></th>
                                    <th><IosCalendarOutline /> <span>Modified Date</span></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    CustomersData.map(({...customerData})=>(
                                            <CustomerItem key={`customer-${uid({...customerData})}`} {...customerData} />
                                        ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CustomersList;