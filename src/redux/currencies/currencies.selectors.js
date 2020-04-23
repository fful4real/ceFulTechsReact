import {createSelector} from 'reselect'


const selectCurrenciesState = state => state.currencies;

export const selectCurrencies = createSelector(
    [selectCurrenciesState],
    currencies => currencies.currencies
)

export const selectIsFetchingCurrencies = createSelector(
    [selectCurrenciesState],
    currencies => currencies.isFetchingCurrencies
)