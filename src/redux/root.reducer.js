
import { combineReducers } from 'redux'
import accountsReducer from './accounts/accounts.reducer'
import ordersReducer from './orders/orders.reducer'
import {reducer as LoginFormReducer} from 'redux-form'
import authReducer from './auth/auth.reducer'
import userReducer from './user/user.reducer'
import customersReducer from './customers/customers.reducer'



export default combineReducers({
    accounts:accountsReducer,
    customers:customersReducer,
    orders: ordersReducer,
    form: LoginFormReducer,
    auth: authReducer,
    user: userReducer
})