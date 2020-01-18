import React, {useState} from 'react'
import IosSearch from 'react-ionicons/lib/IosSearch'
import IosPersonOutline from 'react-ionicons/lib/IosPersonOutline'
import IosCashOutline from 'react-ionicons/lib/IosCashOutline'
import IosCalendarOutline from 'react-ionicons/lib/IosCalendarOutline'
import IosCalendar from 'react-ionicons/lib/IosCalendar'
import IosStatsOutline from 'react-ionicons/lib/IosStatsOutline'
import IosImageOutline from 'react-ionicons/lib/IosImageOutline'
import LastTenOrdersItem from './last-ten-orders-item.component'
import { connect } from 'react-redux'

const LastTenOrdersList = ({ordersData:{orders}})=>{
    const [searchString, setSearchString] = useState('');

    return(
        <div className="card">
            <div className="card-header card-header-action">
                <h6>Last ten orders<small className="text-muted pl-10">for today</small></h6>
                <div className="d-flex align-items-center card-action-wrap">
                    <form action="/" role="search" className="email-search search-form">
                        <div className="input-group">
                            <input type="text" role="search" value={searchString} onChange={(e)=> setSearchString(e.target.value)} className="form-control" placeholder="Search"/>
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
                        <table className="table table-sm table-hover mb-0 list-table">
                            <thead>
                                <tr>
                                    <th><IosImageOutline/><span>Order Reference</span></th>
                                    <th><IosPersonOutline/> <span>Customer Name</span></th>
                                    <th><IosCashOutline/><span> Amount</span></th>
                                    <th><IosStatsOutline/><span> Status</span></th>
                                    <th><IosCalendar/><span> Created Date</span></th>
                                    <th><IosCalendarOutline /> <span>Modified Date</span></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    orders.map(order=>
                                        <LastTenOrdersItem key={order.id} {...order} />
                                    )
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
)}

const mapStateToProps = rootReducerState =>(
    {
        ordersData: rootReducerState.orders
    }
)
export default connect(mapStateToProps)(LastTenOrdersList);