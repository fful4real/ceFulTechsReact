import React from 'react';
import IosAddCircleOutline from 'react-ionicons/lib/IosAddCircleOutline'
import IosListBoxOutline from 'react-ionicons/lib/IosListBoxOutline'
import IosCalculator from 'react-ionicons/lib/IosCalculator'
import { Button } from 'react-bootstrap';
import { setShowAccountsModal, setAccountsModalbodyAttempt, setAccountsModalHeadingAttempt } from '../../../redux/accounts/accounts.action';
import { connect } from 'react-redux';

const AccountsHeader = ({setModalbody, setModalHeading, showModal})=>{
    const handleClick = ()=>{
        setModalbody('create')
        setModalHeading('Add Account')
        showModal(true)
    }
    
    return(
        <div className="hk-pg-header mb-10">
            <div>
                <h4 className="hk-pg-title">
                    <span className="pg-title-icon">
                        <span className="feather-icon">
                        </span>
                    </span> <IosCalculator fontSize="30px" color="#c1c6c8"/>&nbsp;Accounts
                </h4>
            </div>
            <div className="d-flex">
                <Button variant="info" size="sm">
                    <IosListBoxOutline color="#fff" /> Receive Amount&nbsp;
                </Button>
                <Button variant="primary" size="sm" className="order-new" onClick={handleClick}>
                    <IosAddCircleOutline color="#fff" /> Add Account&nbsp;
                </Button>
            </div>
        </div>
    )
}

const mapDispatchToProps = {
    showModal: setShowAccountsModal,
    setModalbody: setAccountsModalbodyAttempt,
    setModalHeading: setAccountsModalHeadingAttempt
}
export default connect(null, mapDispatchToProps)(AccountsHeader);