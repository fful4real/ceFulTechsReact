import React from 'react'
import { Switch, Route } from 'react-router-dom'
import DashBoard from './dashboard/dasboard.component'
import OrdersPage from './orders/orders.page'
import CustomersPage from './customers/customers-page'
import AccountsPage from './accounts/accounts.page'

const ContentContainer = ()=> {
    return (
        <>
        <Switch>
            <Route exact path="/" component={DashBoard} />
            <Route exact path="/orders" component={OrdersPage} />
            <Route exact path="/customers" component={CustomersPage} />
            <Route exact path="/accounts" component={AccountsPage} />
        </Switch>
        </>
    )
}

export default ContentContainer;
