import {createSelector} from 'reselect'


export const selectAuth = state => state.auth;

export const selectIsFetchingAuth = createSelector(
    [selectAuth],
    auth => auth.isFetchingAuth
)