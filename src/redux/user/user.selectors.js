import {createSelector} from 'reselect'


const selectUserState = state => state.user;

// Select User
export const selectUser = createSelector(
    [selectUserState],
    user => user.user
)

// Select isFetchingUser
export const selectIsFetchingUser = createSelector(
    [selectUserState],
    user => user.isFetchingUser
)