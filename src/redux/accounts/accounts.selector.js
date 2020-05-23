import {createSelector} from 'reselect'
import { numberWithCommas } from '../../helpers/helper';


const selectAccountState = state => state.accounts;

export const selectAccounts = createSelector(
    [selectAccountState],
    accountsState => accountsState.accounts
)

// Select isFetchingAccounts
export const selectIsFetchingAccounts = createSelector(
    [selectAccountState],
    accounts => accounts.isFetchingAccounts
)

// Total Accounts Selectors
export const selectAccountsCount = createSelector(
    [selectAccounts],
    accounts =>  accounts.length
);


// Select total for XAF accounts
export const selectAccountsXAFTotal = createSelector(
    [selectAccounts],
    accounts => {
        const amount = accounts.reduce((totalAmount,account)=>{
            return account.currency.currencyCode === "XAF"?totalAmount+parseInt(account.balance):totalAmount
        },0);

       return numberWithCommas(amount)
    }
)

// Select count for XAF accounts
export const selectAccountsXAFCount = createSelector(
    [selectAccounts],
    accounts => {
        const amount = accounts.reduce((totalAmount,account)=>{
            return account.currency.currencyCode === "XAF"?totalAmount+=1:totalAmount
        },0);

       return numberWithCommas(amount)
    }
)

// Select total for AED accounts
export const selectAccountsAEDTotal = createSelector(
    [selectAccounts],
    accounts => {
        const amount = accounts.reduce((totalAmount,account)=>{
            return account.currency.currencyCode === "AED"?totalAmount+parseInt(account.balance):totalAmount
        },0);

       return numberWithCommas(amount)
    }
)

// Select count for AED accounts
export const selectAccountsAEDCount = createSelector(
    [selectAccounts],
    accounts => {
        const amount = accounts.reduce((totalAmount,account)=>{
            return account.currency.currencyCode === "AED"?totalAmount+=1:totalAmount
        },0);

       return numberWithCommas(amount)
    }
)
//Seelect account modal
export const selectAccountModalObject = createSelector(
    [selectAccountState],
    accountsState => accountsState.accountsModal
)
//Seelect receiving account
export const selectReceivingAccount = createSelector(
    [selectAccountState],
    accountsState => accountsState.receivingAccount
)