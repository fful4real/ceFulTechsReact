import {createSelector} from 'reselect'


const selectStatusesState = state => state.statuses;

export const selectStatuses = createSelector(
    [selectStatusesState],
    statuses => statuses.statuses
)

export const selectIsFetchingStatuses = createSelector(
    [selectStatusesState],
    statuses => statuses.isFetchingStatuses
    
)