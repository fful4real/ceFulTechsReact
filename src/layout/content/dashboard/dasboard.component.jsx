import React, { Component } from 'react'
// import ReportSmallCardList from '../../components/reportSmallCard-list/reportSmallCard-list.component'
// import LastTenTransactionsContainer from '../../components/last-ten-transactions/last-ten-transactions-container.component'
// import ReportMediumCardContainter from '../../components/report-medium-card/report-medium-card-container.component'
import SmallCardReportList from './small-card-report/small-card-report-list.component'
import MediumCardReportList from './medium-card-report/medium-card-report-list.component';
import LastTenTransactionsList from './last-transactions/last-ten-transactions-list.component';
import { setActivePageAttempt } from '../../../redux/defaults/default.action';
import { connect } from 'react-redux';

class DashBoard extends Component {
    
    componentWillMount() {
        this.props.setActivePage('dashboard')
    }

    render() {
        return(
            <div className="hk-pg-wrapper">
                <div className="container-fluid mt-xl-50 mt-sm-30 mt-15">
                    <div className="row">
                        <div className="col-xl-12">
                            <SmallCardReportList/>
                            <MediumCardReportList/>
                            <LastTenTransactionsList/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = {
    setActivePage:setActivePageAttempt
  }

export default connect(null, mapDispatchToProps)(DashBoard);