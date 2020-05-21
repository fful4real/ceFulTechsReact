import {createSelector} from 'reselect'


const selectBanksState = state => state.banks;

// Select account types
export const selectBanks = createSelector(
    [selectBanksState],
    banksState => banksState.banks
)

// Select is fetching account types
export const selectIsFetchingBanks = createSelector(
    [selectBanksState],
    banksState=>banksState.isFetchingBanks
)