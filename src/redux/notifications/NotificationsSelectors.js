import {createSelector} from 'reselect'


const selectNotificationsState = state => state.notifications;

// Select notifications types
export const selectNotifications = createSelector(
    [selectNotificationsState],
    notificationsState => notificationsState.notifications
)

// Select is fetching notifications types
export const selectIsFetchingNotifications = createSelector(
    [selectNotificationsState],
    notificationsState=>notificationsState.isFetchingNotifications
)