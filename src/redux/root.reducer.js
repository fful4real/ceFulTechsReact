
import { combineReducers } from 'redux'
import accountsReducer from './accounts/accounts.reducer'
import ordersReducer from './orders/orders.reducer'
import {reducer as LoginFormReducer} from 'redux-form'
import authReducer from './auth/auth.reducer'
import userReducer from './user/user.reducer'
import customersReducer from './customers/customers.reducer'
import CurrenciesReducer from './currencies/currencies.reducer'
import CitiesReducer from './cities/cities.reducer'

export default combineReducers({
    accounts:accountsReducer,
    customers:customersReducer,
    currencies: CurrenciesReducer,
    cities: CitiesReducer,
    orders: ordersReducer,
    form: LoginFormReducer,
    auth: authReducer,
    user: userReducer
})