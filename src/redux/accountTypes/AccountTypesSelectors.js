import {createSelector} from 'reselect'


const selectAccountTypesState = state => state.accountTypes;

// Select account types
export const selectAccountTypes = createSelector(
    [selectAccountTypesState],
    accountTypesState => accountTypesState.accountTypes
)

// Select is fetching account types
export const seleIsFetchingAccountTypes = createSelector(
    [selectAccountTypesState],
    accountTypesState=>accountTypesState.isFetchingAccountTypes
)