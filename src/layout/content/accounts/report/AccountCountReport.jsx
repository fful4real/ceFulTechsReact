import React from 'react'
import { createStructuredSelector } from 'reselect';
import { selectAccountsCount } from '../../../../redux/accounts/accounts.selector';
import { connect } from 'react-redux';
import { selectCurrenciesCount } from '../../../../redux/currencies/currencies.selectors';

const AccountCountReport = ({accountCount, totalCurrencies})=>{

    return(
        <div className="col-lg-4 col-md-4">
                <div className="card card-sm">
                    <div className="card-body">
                        <div className="d-flex justify-content-between mb-5">
                            <div>
                                <span className="d-block font-15 text-dark font-weight-500">Number Of Accounts</span>
                            </div>
                        </div>
                        <div className="text-center">
                            <span className="d-block display-4 text-dark mb-5">{accountCount}</span>
                            <small className="d-block">from {totalCurrencies} currencies</small>
                        </div>
                    </div>
                </div>
            </div>
    )
}

const mapStateToProps = createStructuredSelector({
    accountCount: selectAccountsCount,
    totalCurrencies: selectCurrenciesCount
})

export default connect(mapStateToProps)(AccountCountReport);