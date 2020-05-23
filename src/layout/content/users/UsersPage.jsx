import React, { Component } from 'react';
import ModalComponent from '../../../components/modal/modal-component';
import ModalAlert from '../../../components/alert/ModalAlert';
import { connect } from 'react-redux'
import { setActivePageAttempt } from '../../../redux/defaults/default.action';
import { Switch, Route } from 'react-router-dom';
import UserProfile from './profile/UserProfile';
import { createStructuredSelector } from 'reselect';
import { selectAccountModalObject } from '../../../redux/accounts/accounts.selector';
import { closeAccountsModalAttempt } from '../../../redux/accounts/accounts.action';
import CreateAccountForm from '../accounts/forms/CreateAccountForm';

class UsersPage extends Component {
    constructor(props) {
        super(props);
        this.props.setActivePage('users')
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
                    <ModalComponent showModal={accountsModal.show} closeModal={closeModal} modalHeading={accountsModal.heading}>
                        <ModalAlert />
                        {accountsModal.body==='modify'&&<CreateAccountForm closeModal={closeModal}  />}
                    </ModalComponent>
                    <Switch>
                        <Route path="/users/:id" component={UserProfile} />
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

export default connect(mapStateToProps,mapDispatchToProps)(UsersPage);