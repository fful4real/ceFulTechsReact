import React, { Component } from 'react'
import CustomersHeader from './customers-header.component'
import CustomersRepors from './customers-report.component'
import './customers.styles.scss'
import CustomersList from './customers-list.component'
import { connect } from 'react-redux'
import { setActivePageAttempt } from '../../../redux/defaults/default.action'
import ModalComponent from '../../../components/modal/modal-component'
import { createStructuredSelector } from 'reselect'
import { selectCustomerModal, selectShowCustomerModal } from '../../../redux/customers/customers.selectors'
import { setCloseCustomerModal } from '../../../redux/customers/customers.action'
import CreateCustomerForm from './forms/CreateCustomerForm'



class CustomersPage extends Component {
    constructor(props) {
        super(props);
        this.props.setActivePage('customers')
    }
    
    render() {
    
    const {customerModal, showModal, closeModal} = this.props
    // console.log(customerModal)
        return(
            <div className="hk-pg-wrapper">
                <div className="container mt-xl-30 mt-sm-20 mt-15">
                    <CustomersHeader/>
                    <ModalComponent showModal={showModal} closeModal={closeModal}>
                        {customerModal==='create'&&<CreateCustomerForm closeModal={closeModal} modalHeading="Add Customer" />}
                    </ModalComponent>
                    <div className="row">
                        <div className="col-xl-12">
                            <CustomersRepors />
                            <CustomersList />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = {
    setActivePage:setActivePageAttempt,
    closeModal: setCloseCustomerModal
}

const mapStateToProps = createStructuredSelector({
    showModal: selectShowCustomerModal,
    customerModal: selectCustomerModal
})

export default connect(mapStateToProps,mapDispatchToProps)(CustomersPage);