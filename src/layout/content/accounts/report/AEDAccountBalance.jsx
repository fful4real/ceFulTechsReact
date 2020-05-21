import React from 'react'
import { createStructuredSelector } from 'reselect';
import { selectAccountsAEDTotal, selectAccountsAEDCount } from '../../../../redux/accounts/accounts.selector';
import { connect } from 'react-redux';

const AEDAccountBalance = ({aedTotal, aedCount})=>{

    return(
        <div className="col-lg-4 col-md-4">
                <div className="card card-sm">
                    <div className="card-body">
                        <div className="d-flex justify-content-between mb-5">
                            <div>
                                <span className="d-block font-15 text-dark font-weight-500">Account Balance AED</span>
                            </div>
                            <div>
                                <span className="text-warning font-14 font-weight-500">+10%</span>
                            </div>
                        </div>
                        <div className="text-center">
                            <span className="d-block display-4 text-dark mb-5">
                                <span className="counter-anim">{aedTotal}</span>
                            </span>
                            <small className="d-block">
                                for total of {aedCount} AED accounts
                            </small>
                        </div>
                    </div>
                </div>
            </div>
    )
}

const mapStateToProps = createStructuredSelector({
    aedTotal: selectAccountsAEDTotal,
    aedCount: selectAccountsAEDCount,
})

export default connect(mapStateToProps)(AEDAccountBalance);