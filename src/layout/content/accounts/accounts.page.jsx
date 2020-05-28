import React, { Component } from 'react';
import './accounts.styles.scss'
import AccountsHeader from './accounts-header.component';
import ModalComponent from '../../../components/modal/modal-component';
import ModalAlert from '../../../components/alert/ModalAlert';
import { createStructuredSelector } from 'reselect';
import { selectAccountModalObject } from '../../../redux/accounts/accounts.selector';
import CreateAccountForm from './forms/CreateAccountForm';
import { closeAccountsModalAttempt } from '../../../redux/accounts/accounts.action';
import { connect } from 'react-redux'
import { setActivePageAttempt } from '../../../redux/defaults/default.action';
import { Switch, Route } from 'react-router-dom';
import AccountsDashoard from './AccountsDashoard';
import AccountProfile from './profile/AccountProfile';
import CreateOrderForm from '../../forms/create-order.form';
import TransferAmountForm from './forms/TransferAmountForm';

class AccountsPage extends Component {
    constructor(props) {
        super(props);
        this.props.setActivePage('accounts')
    }

    UNSAFE_componentWillMount() {

    }

    componentDidMount() {

    }

    UNSAFE_componentWillReceiveProps(nextProps) {

    }

    shouldComponentUpdate(nextProps, nextState) {
        return true
    }

    UNSAFE_componentWillUpdate(nextProps, nextState) {

    }

    componentDidUpdate(prevProps, prevState) {

    }

    UNSAFE_componentWillUnmount() {

    }

    render() {
        const {accountsModal,closeModal} = this.props
        return(
            <div className="hk-pg-wrapper">
                <div className="container mt-xl-30 mt-sm-20 mt-15">
                    <AccountsHeader/>
                    <ModalComponent showModal={accountsModal.show} closeModal={closeModal} modalHeading={accountsModal.heading}>
                        <ModalAlert />
                        {accountsModal.body==='create'&&<CreateAccountForm closeModal={closeModal}  />}
                        {accountsModal.body==='receive'&&<CreateOrderForm closeModal={closeModal} receiving={true} />}
                        {accountsModal.body==='transfer'&&<TransferAmountForm closeModal={closeModal} />}
                    </ModalComponent>
                    <Switch>
                        <Route path="/accounts/:id" component={AccountProfile} />
                        <Route path="/accounts" component={AccountsDashoard} />
                    </Switch>
                </div>
            </div>
        )
    }
}

const mapStateToProps = createStructuredSelector({
    accountsModal: selectAccountModalObject
})

const mapDispatchToProps ={
    setActivePage:setActivePageAttempt,
    closeModal: closeAccountsModalAttempt
}

export default connect(mapStateToProps,mapDispatchToProps)(AccountsPage);