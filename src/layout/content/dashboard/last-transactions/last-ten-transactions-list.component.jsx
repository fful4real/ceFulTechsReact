import React, {useState} from 'react'
import IosSearch from 'react-ionicons/lib/IosSearch'
import IosPersonOutline from 'react-ionicons/lib/IosPersonOutline'
import IosCashOutline from 'react-ionicons/lib/IosCashOutline'
import IosCalendarOutline from 'react-ionicons/lib/IosCalendarOutline'
import IosStatsOutline from 'react-ionicons/lib/IosStatsOutline'
import IosFlaskOutline from 'react-ionicons/lib/IosFlaskOutline'
import IosImageOutline from 'react-ionicons/lib/IosImageOutline'
import LastTenTransactionsItem from './last-ten-transactions-item.component'
import {uid} from 'react-uid'
import LastTenTransactions from './data'
import './last-ten-transactions.styles.scss'

const LastTenTransactionsList = ()=>{
    
    const [searchString, setSearchString] = useState('');

    return(
        <div className="card">
            <div className="card-header card-header-action">
                <h6>Last ten transactions<small className="text-muted pl-10">for today</small></h6>
                <div className="d-flex align-items-center card-action-wrap">
                    <form action="/" role="search" className="email-search search-form">
                        <div className="input-group">
                            <input type="text" role="search" onChange={(e)=> setSearchString(e.target.value)} className="form-control" placeholder="Search"/>
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
                                    <th><IosImageOutline/><span>Image</span></th>
                                    <th><IosPersonOutline/> <span>Customer Name</span></th>
                                    <th><IosCashOutline/><span> Amount</span></th>
                                    <th><IosStatsOutline/><span> Status</span></th>
                                    <th><IosFlaskOutline/><span> Type</span></th>
                                    <th><IosCalendarOutline /> <span>Modified Date</span></th>
                                </tr>
                            </thead>
                            <tbody>
                             {
                                LastTenTransactions
                                .filter(item=>item.customerName.toLowerCase().indexOf(searchString.toLowerCase())!==-1)
                                .map(({...transactionItem})=>(
                                        <LastTenTransactionsItem key={`transaction-item-${uid({...transactionItem})}`} {...transactionItem} />
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
)}

export default LastTenTransactionsList;