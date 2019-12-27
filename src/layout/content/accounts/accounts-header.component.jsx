import React, {useState} from 'react';
import IosAddCircleOutline from 'react-ionicons/lib/IosAddCircleOutline'
import IosListBoxOutline from 'react-ionicons/lib/IosListBoxOutline'
import IosCalculator from 'react-ionicons/lib/IosCalculator'
import { Button } from 'react-bootstrap';
import CreateAccountModal from './create-account/create-account-modal.component';

const AccountsHeader = ()=>{

    const [modalShow, setModalShow] = useState(false);

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
                    <IosListBoxOutline color="#fff" /> List Accounts&nbsp;
                </Button>
                <Button variant="primary" size="sm" className="order-new" onClick={() => setModalShow(true)}>
                    <IosAddCircleOutline color="#fff" /> Create New Account&nbsp;
                </Button>
                <CreateAccountModal show={modalShow} onHide={() => setModalShow(false)}/>
            </div>
        </div>
    )
}

export default AccountsHeader;