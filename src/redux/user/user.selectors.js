import {createSelector} from 'reselect'


const selectUserState = state => state.user;

export const selectUser = createSelector(
    [selectUserState],
    user => user.user
)

export const selectIsFetchingUser = createSelector(
    [selectUserState],
    user => user.isFetchingUser
)