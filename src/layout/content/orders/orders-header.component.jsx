import React, {useState} from 'react';
import IosAddCircleOutline from 'react-ionicons/lib/IosAddCircleOutline'
import IosListBoxOutline from 'react-ionicons/lib/IosListBoxOutline'
import IosPaperOutline from 'react-ionicons/lib/IosPaperOutline'
import { Button } from 'react-bootstrap';
import CreateOrderModal from './create-order/create-order-modal.component'
import { Link } from 'react-router-dom';

const OrdersHeader = ({addOrderToState})=>{
    const [modalShow, setModalShow] = useState(false);
    return(
        <div className="hk-pg-header mb-10">
            <div>
                <h4 className="hk-pg-title">
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
                <Button variant="primary" size="sm" className="order-new" onClick={() => setModalShow(true)}>
                    <IosAddCircleOutline color="#fff" /> Create New Order&nbsp;
                </Button>
                <CreateOrderModal show={modalShow} onHide={() => setModalShow(false)}/>
            </div>
        </div>
    )
}

export default OrdersHeader