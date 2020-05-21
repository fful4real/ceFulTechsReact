import React, { Component } from 'react';
import './accounts.styles.scss'
import AccountsHeader from './accounts-header.component';
import AccountsReports from './accounts-report.component';
import AccountsList from './AccountsList';
import ModalComponent from '../../../components/modal/modal-component';
import ModalAlert from '../../../components/alert/ModalAlert';
import { createStructuredSelector } from 'reselect';
import { selectAccountModalObject } from '../../../redux/accounts/accounts.selector';
import CreateAccountForm from './forms/CreateAccountForm';
import { closeAccountsModalAttempt } from '../../../redux/accounts/accounts.action';
import { connect } from 'react-redux'
import { setActivePageAttempt } from '../../../redux/defaults/default.action';

class AccountsPage extends Component {
    constructor(props) {
        super(props);
        this.props.setActivePage('accounts')
    }

    componentWillMount() {

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
                            {accountsModal.body==='new'&&<CreateAccountForm closeModal={closeModal}  />}
                        </ModalComponent>
                    <div className="row">
                        <div className="col-xl-12">
                            <AccountsReports/>
                            <AccountsList/>
                        </div>
                    </div>
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