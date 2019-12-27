
import { combineReducers } from 'redux'
import accountsReducer from './accounts/accounts.reducer'
import customersReducer from './customers/customers.reducer'
import ordersReducer from './orders/orders.reducer'


export default combineReducers({
    accounts:accountsReducer,
    customers:customersReducer,
    orders: ordersReducer,
})