import {createSelector} from 'reselect'
import { numberWithCommas } from '../../helpers/helper';


const selectAccountState = state => state.accounts;

export const selectAccounts = createSelector(
    [selectAccountState],
    accountsState => accountsState.accounts
)

export const selectIsFetchingAccounts = createSelector(
    [selectAccountState],
    accounts => accounts.isFetchingAccounts
)

// Total Accounts Selectors
export const selectAccountsCount = createSelector(
    [selectAccounts],
    accounts =>  accounts.length
);

export const selectAccountsTotalAmount = createSelector(
    [selectAccounts],
    accounts => {
       const amount = accounts.reduce((totalAmount,order)=>totalAmount+=parseInt(order.amountOut),0);

       return numberWithCommas(amount)
    }
)

//Seelect account modal
export const selectAccountModalObject = createSelector(
    [selectAccountState],
    accountsState => accountsState.accountsModal
)