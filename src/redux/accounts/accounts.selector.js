import {createSelector} from 'reselect'
import { numberWithCommas } from '../../helpers/helper';


const selectAccountState = state => state.accounts;
const selectCurrenciesState = state => state.currencies;

const selectCurrencies = createSelector(
    [selectCurrenciesState],
    currencies => currencies.currencies
)
export const selectAccounts = createSelector(
    [selectAccountState, selectCurrencies],
    (accounts,currencies) => accounts.accounts.map(account=>{
        // console.log("Currency: ",currencies)
        return({
        ...account,
        currency:typeof account.currency === 'string'?currencies.filter(currency=>parseInt(currency.id)===parseInt(account.currency.split("/")[3]))[0]:account.currency
    })})
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