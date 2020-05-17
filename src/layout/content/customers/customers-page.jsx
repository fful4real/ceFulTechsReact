import React, { Component } from 'react'
import CustomersHeader from './customers-header.component'
import './customers.styles.scss'
import { connect } from 'react-redux'
import { setActivePageAttempt } from '../../../redux/defaults/default.action'
import ModalComponent from '../../../components/modal/modal-component'
import { createStructuredSelector } from 'reselect'
import { selectCustomerModal, selectShowCustomerModal, selectCustomerModalHeading } from '../../../redux/customers/customers.selectors'
import { setCloseCustomerModal } from '../../../redux/customers/customers.action'
import CreateCustomerForm from './forms/CreateCustomerForm'
import { Switch, Route } from 'react-router-dom'
import CustomersDashboard from './CustomersDashboard'
import CustomersList from './CustomersList'
import ModalAlert from '../../../components/alert/ModalAlert'
import CustomerProfile from './CustomerProfile'
import ModifyCustomerForm from './forms/ModifyCustomerForm'



class CustomersPage extends Component {
    constructor(props) {
        super(props);
        this.props.setActivePage('customers')
    }
    
    render() {
    
    const {customerModal, showModal,modalHeading,closeModal} = this.props
    // console.log(customerModal)
        return(
            <div className="hk-pg-wrapper">
                <div className="container mt-xl-30 mt-sm-20 mt-15">
                    <CustomersHeader/>
                    <ModalComponent showModal={showModal} closeModal={closeModal} modalHeading={modalHeading}>
                    <ModalAlert />
                        {customerModal==='create'&&<CreateCustomerForm closeModal={closeModal}  />}
                        {customerModal==='modify'&&<ModifyCustomerForm closeModal={closeModal}  />}
                    </ModalComponent>

                    <Switch>
                        <Route path="/customers/list" component={CustomersList} />
                        <Route path="/customers/ofmonth" component={()=>(<CustomersList filterBy='ofmonth' />)} />
                        <Route path="/customers/pendingorders" component={()=>(<CustomersList filterBy='pendingorders' />)} />
                        <Route path="/customers/:id" component={CustomerProfile} />
                        <Route path="/customers" component={CustomersDashboard} />
                    </Switch>
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
    customerModal: selectCustomerModal,
    modalHeading: selectCustomerModalHeading
})

export default connect(mapStateToProps,mapDispatchToProps)(CustomersPage);