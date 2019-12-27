import React, {useState} from 'react';
import IosAddCircleOutline from 'react-ionicons/lib/IosAddCircleOutline'
import IosListBoxOutline from 'react-ionicons/lib/IosListBoxOutline'
import IosPaperOutline from 'react-ionicons/lib/IosPaperOutline'
import { Button } from 'react-bootstrap';
import CreateOrderModal from './create-order/create-order-modal.component';
import { connect } from 'react-redux';
import { createNewOrder } from '../../../redux/orders/orders.actions';

const OrdersHeader = ({createNewOrder})=>{
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
                    <IosListBoxOutline color="#fff" /> List Orders&nbsp;
                </Button>
                <Button variant="primary" size="sm" className="order-new" onClick={() => setModalShow(true)}>
                    <IosAddCircleOutline color="#fff" /> Create New Order&nbsp;
                </Button>
                <CreateOrderModal show={modalShow} onHide={() => setModalShow(false)}/>
            </div>
        </div>
    )
}

const mapDispatchToProps = dispatch =>({
    createNewOrder: order => dispatch(createNewOrder(order))
})
export default connect(null,mapDispatchToProps)(OrdersHeader);