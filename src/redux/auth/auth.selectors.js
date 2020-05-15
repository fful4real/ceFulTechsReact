import {createSelector} from 'reselect'


export const selectAuthState = state => state.auth;

export const selectIsFetchingAuth = createSelector(
    [selectAuthState],
    auth => auth.isFetchingAuth
)

export const selectIsUserAuthenticated = createSelector(
    [selectAuthState],
    authState => authState.isUserAuthenticated
)