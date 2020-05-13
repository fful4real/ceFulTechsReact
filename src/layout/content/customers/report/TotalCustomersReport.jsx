import React from 'react'
import { createStructuredSelector } from 'reselect';
import { selectTotalCustomers, selectIsFetchingCustomers } from '../../../../redux/customers/customers.selectors';
import { connect } from 'react-redux';
import SpinnerDisplay from '../../../../components/spinner/spinnerDisplay';
import DisplayReport from '../../../../components/report/display-report';

const TotalCustomersReport = ({totalCustomers, isFetching})=>{
    // console.log(totalCustomers)
    return isFetching?
        (
            <SpinnerDisplay title="Total Customers" displayClassName="col-lg-4 col-md-6"/>
        ):(
            <DisplayReport 
                title = "Total Customers"
                value1={totalCustomers}
                value2={totalCustomers}
                subTitle="Valued Customers"
                incrementValue="-30"
                incrementClass="success"
                linkTo = "/customers/list"
                displayClassName="col-lg-4 col-md-6"
            />
        )
}

const mapStateToProps = createStructuredSelector({
    totalCustomers: selectTotalCustomers,
    isFetching: selectIsFetchingCustomers
})
export default connect(mapStateToProps)(TotalCustomersReport);