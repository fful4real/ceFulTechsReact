import React from 'react'
import { Switch, Route } from 'react-router-dom'
import DashBoard from './dashboard/dasboard.component'
import OrdersPage from './orders/orders.page'
import CustomersPage from './customers/customers-page'
import AccountsPage from './accounts/accounts.page'

const ContentContainer = ()=> {
    return (
        <Switch>
            <Route path="/orders" component={OrdersPage} />
            <Route path="/customers" component={CustomersPage} />
            <Route path="/accounts" component={AccountsPage} />
            <Route path="/" component={DashBoard} />
        </Switch>
    )
}

export default ContentContainer;
