import React, { Component } from 'react'
import OrdersHeader from './orders-header.component'
import './orders.styles.scss'
import OrdersDashboard from './pages/orders-dashboard'
import { Switch, Route } from 'react-router-dom'
import OrdersItem from './pages/orders-item'
import OrdersPageOrdersList from './pages/OrdersPageOrdersList'
import { setActivePageAttempt } from '../../../redux/defaults/default.action'
import { connect } from 'react-redux'

class OrdersPage extends Component {
    constructor(props) {
        super(props);
        this.props.setActivePage('orders')
    }

    render() {
        return(
            <div className="hk-pg-wrapper">
                <div className="container mt-xl-30 mt-sm-20 mt-15">
                    <OrdersHeader/>
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
    setActivePage:setActivePageAttempt
  }

export default connect(null,mapDispatchToProps)(OrdersPage);