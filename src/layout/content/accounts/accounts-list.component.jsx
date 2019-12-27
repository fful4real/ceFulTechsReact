import React from 'react'
import AccountItem from './account-list-item.component'


import IosPinOutline from 'react-ionicons/lib/IosPinOutline'
import IosSearch from 'react-ionicons/lib/IosSearch'
import IosBriefcaseOutline from 'react-ionicons/lib/IosBriefcaseOutline'
import IosCashOutline from 'react-ionicons/lib/IosCashOutline'
import IosCalendarOutline from 'react-ionicons/lib/IosCalendarOutline'
import IosPaperOutline from 'react-ionicons/lib/IosPaperOutline'
// import MaterialIcon from 'react-material-iconic-font'


import {uid} from 'react-uid'
import { connect } from 'react-redux'

const AccountsList = ({accountsData})=>{
    const {accounts}=accountsData;
    // console.log(accounts);

    return(
        <div className="card">
            <div className="card-header card-header-action">
                <h6>Last ten Accounts<small className="text-muted pl-10">available</small></h6>
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
                                    <th><IosBriefcaseOutline/> <span>Account Name</span></th>
                                    <th><IosPinOutline/><span> Account Code</span></th>
                                    <th><IosCashOutline/><span> Amount</span></th>
                                    <th><IosPaperOutline/><span> Bank</span></th>
                                    <th><IosCalendarOutline /> <span>Modified Date</span></th>
                                </tr>
                            </thead>
                            <tbody>
                                 {
                                    accounts.map(({...accountData})=>(
                                        <AccountItem key={`account-${uid({...accountData})}`} {...accountData} />
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

const mapStateToProps = rootReducerState =>({
    accountsData:rootReducerState.accounts
});

export default connect(mapStateToProps)(AccountsList);