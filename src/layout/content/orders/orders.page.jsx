import React, { Component } from 'react'
import OrdersHeader from './orders-header.component'
import './orders.styles.scss'
import OrdersDashboard from './pages/orders-dashboard'
import { Switch, Route } from 'react-router-dom'
import OrdersItem from './pages/orders-item'
import OrdersPageOrdersList from './pages/OrdersPageOrdersList'
import { setActivePageAttempt } from '../../../redux/defaults/default.action'
import { connect } from 'react-redux'
import ModalComponent from '../../../components/modal/modal-component'
import ModalAlert from '../../../components/alert/ModalAlert'
import { createStructuredSelector } from 'reselect'
import { selectOrderModalObject } from '../../../redux/orders/orders.selectors'
import CreateOrderForm from '../../forms/create-order.form'
import { closeOrdersModalAttempt } from '../../../redux/orders/orders.actions'
import OrderModificationForm from './forms/order-modification.form'
import OrderProcessingForm from './forms/order-processing.form'
import OrderAbandonForm from './forms/order-abandon.form'

class OrdersPage extends Component {
    constructor(props) {
        super(props);
        this.props.setActivePage('orders')
    }

    render() {
        const {ordersModal, closeModal} = this.props
        return(
            <div className="hk-pg-wrapper">
                <div className="container mt-xl-30 mt-sm-20 mt-15">
                    <OrdersHeader/>
                    <ModalComponent showModal={ordersModal.show} closeModal={closeModal} modalHeading={ordersModal.heading}>
                        <ModalAlert />
                        {ordersModal.body==='create'&&<CreateOrderForm closeModal={closeModal}  />}
                        {ordersModal.body==='modify'&&<OrderModificationForm closeModal={closeModal}  />}
                        {ordersModal.body==='process'&&<OrderProcessingForm  closeModal={closeModal}  />}
                        {ordersModal.body==='abandon'&&<OrderAbandonForm  closeModal={closeModal}  />}
                    </ModalComponent>
                    <Switch>

                        <Route path="/orders/list" component={OrdersPageOrdersList} />
                        <Route path="/orders/new" component={()=><OrdersPageOrdersList pagefilter = "NEW"/>} />
                        <Route path="/orders/pending" component={()=><OrdersPageOrdersList pagefilter = "PTL"/>} />
                        <Route path="/orders/processed" component={()=><OrdersPageOrdersList pagefilter = "OK"/>} />
                        <Route path="/orders/:id" component={OrdersItem} />
                        <Route path="/orders" component={OrdersDashboard} />
                    </Switch>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = {
    setActivePage:setActivePageAttempt,
    closeModal: closeOrdersModalAttempt
  }
const mapStateToProps = createStructuredSelector({
    ordersModal: selectOrderModalObject
})

export default connect(mapStateToProps,mapDispatchToProps)(OrdersPage);