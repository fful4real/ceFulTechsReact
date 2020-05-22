import {createSelector} from 'reselect'


const selectAccountEntriesState = state => state.accountEntries;

export const selectAccountEntries = createSelector(
    [selectAccountEntriesState],
    accountEntriesState => accountEntriesState.accountEntries
)

// Select isFetchingAccountEntries
export const selectIsFetchingAccountEntries = createSelector(
    [selectAccountEntriesState],
    accountEntries => accountEntries.isFetchingAccountEntries
)

// Total AccountEntries Selectors
export const selectAccountEntriesCount = createSelector(
    [selectAccountEntries],
    accountEntries =>  accountEntries.length
);