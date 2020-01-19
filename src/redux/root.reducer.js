
import { combineReducers } from 'redux'
import accountsReducer from './accounts/accounts.reducer'
import customersReducer from './customers/customers.reducer'
import ordersReducer from './orders/orders.reducer'
import {reducer as LoginFormReducer} from 'redux-form'
import authReducer from './auth/auth.reducer'



export default combineReducers({
    accounts:accountsReducer,
    customers:customersReducer,
    orders: ordersReducer,
    form: LoginFormReducer,
    auth: authReducer
})