
import { combineReducers } from 'redux'
import accountsReducer from './accounts/accounts.reducer'
import ordersReducer from './orders/orders.reducer'
import {reducer as LoginFormReducer} from 'redux-form'
import authReducer from './auth/auth.reducer'
import userReducer from './user/user.reducer'
import customersReducer from './customers/customers.reducer'
import CurrenciesReducer from './currencies/currencies.reducer'
import CitiesReducer from './cities/cities.reducer'
import statusesReducer from './statuses/statuses.reducer'
import DefaultParamsReducer from './defaults/default.reducer'
import FultechsReducer from './fultechs/FultechsReducer'
import AccountTypesReducer from './accountTypes/AccountTypesReducer'
import BanksReducer from './banks/BanksReducer'
import ImagesReducer from './Images/ImagesReducer'
import NotificationsReducer from './notifications/NotificationsReducer'
import AccountEntriesReducer from './accountEntries/AccountEntriesReducer'

export default combineReducers({
    accounts:accountsReducer,
    customers:customersReducer,
    currencies: CurrenciesReducer,
    cities: CitiesReducer,
    orders: ordersReducer,
    form: LoginFormReducer,
    auth: authReducer,
    user: userReducer,
    statuses: statusesReducer,
    defaultParams: DefaultParamsReducer,
    fultechs: FultechsReducer,
    accountTypes: AccountTypesReducer,
    banks: BanksReducer,
    images: ImagesReducer,
    accountEntries: AccountEntriesReducer,
    notifications: NotificationsReducer,
})