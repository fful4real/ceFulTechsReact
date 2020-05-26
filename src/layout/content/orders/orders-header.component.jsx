import React from 'react';
import IosAddCircleOutline from 'react-ionicons/lib/IosAddCircleOutline'
import IosListBoxOutline from 'react-ionicons/lib/IosListBoxOutline'
import IosPaperOutline from 'react-ionicons/lib/IosPaperOutline'
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { setShowOrdersModalAttempt, setOrdersModalbodyAttempt, setOrdersModalHeadingAttempt } from '../../../redux/orders/orders.actions';

const OrdersHeader = ({showModal,setModalHeading,setModalbody})=>{
    const handleClick = ()=>{
        setModalbody('create')
        setModalHeading('Add Order')
        showModal(true)
    }
    return(
        <div className="hk-pg-header mb-10">
            <div>
                <h4 className="hk-pg-title position-relative cursor-pointer">
                    <span className="pg-title-icon">
                        <span className="feather-icon">
                        </span>
                    </span> <IosPaperOutline fontSize="30px" color="#c1c6c8"/>&nbsp;Orders
                    
                </h4>
            </div>
            <div className="d-flex">
                <Button variant="info" size="sm">
                    <Link to="/orders/list">
                        <IosListBoxOutline color="#fff"/>
                        <span className="text-white"> List Orders&nbsp;</span>
                    </Link>
                </Button>
                <Button variant="primary" size="sm" className="order-new" onClick={handleClick}>
                    <IosAddCircleOutline color="#fff" /> Create Order&nbsp;
                </Button>
            </div>
        </div>
    )
}

const mapDispatchToProps = {
    showModal: setShowOrdersModalAttempt,
    setModalbody: setOrdersModalbodyAttempt,
    setModalHeading: setOrdersModalHeadingAttempt
}

export default connect(null,mapDispatchToProps)(OrdersHeader)