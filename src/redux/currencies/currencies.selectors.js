import {createSelector} from 'reselect'


const selectCurrenciesState = state => state.currencies;

export const selectCurrencies = createSelector(
    [selectCurrenciesState],
    currenciesState => currenciesState.currencies
)

export const selectIsFetchingCurrencies = createSelector(
    [selectCurrenciesState],
    currenciesState => currenciesState.isFetchingCurrencies
)

// Select currency count
export const selectCurrenciesCount = createSelector(
    [selectCurrencies],
    currencies => currencies.length
)