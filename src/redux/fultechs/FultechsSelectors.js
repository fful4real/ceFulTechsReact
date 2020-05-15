import {createSelector} from 'reselect'
import { selectOrderState } from '../orders/orders.selectors';
import { selectCustomersState } from '../customers/customers.selectors';


const selectFultechsState = state => state.fultechs;

// Select Items Per Page
export const selectItemsPerPage = createSelector(
    [selectFultechsState],
    fultechsState => fultechsState.itemsPerPage
)

// Select Active Page
export const selectActivePage = createSelector(
    [selectFultechsState],
    fultechsState => fultechsState.activePage
)

// Select is FulTechs refreshing
export const selectIsRefreshingFultechs = createSelector(
    [selectOrderState, selectCustomersState],
     (ordersState, customersState) => ordersState.isFetchingAllOrders||customersState.isFetchingAllCustomers
)

// Select refresh time interval
export const selectFultechsRefreshTimeInterval = createSelector(
    [selectFultechsState],
    ftstate => ftstate.refreshTimeInterval
)

// Select refresh time interval
export const selectModalAlert = createSelector(
    [selectFultechsState],
    ftstate => ftstate.modalAlert
)