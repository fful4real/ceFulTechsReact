import AxiosAgent from "../../axios-agent";
import API_ROUTES from "../../api-route";
import NotificationsActionTypes from "./NotificationsTypes";

// Fetch notifications 
export const fetchNotificationsStart = ()=>({
    type: NotificationsActionTypes.NOTIFICATIONS_FETCHING_START
})
export const fetchNotificationsSuccess = notifications =>({
    type: NotificationsActionTypes.NOTIFICATIONS_FETCHING_SUCCESS,
    notifications
})
export const fetchNotificationsFailure = error =>({
    type: NotificationsActionTypes.NOTIFICATIONS_FETCHING_FAILURE,
    error
})

export const fetchNotificationsAsync = (userId)=>{

    return dispatch =>{
        dispatch(fetchNotificationsStart());
        AxiosAgent.request('get',API_ROUTES.notifications(userId), null, null)
        .then(resp => {
            // console.log(resp.data)
            dispatch(fetchNotificationsSuccess(resp.data))
        })
        .catch(err => {
            console.error(err.message)
        })
    }
}

// Update Account type

export const updateNotifications = notifications =>({
    type: NotificationsActionTypes.UPDATE_NOTIFICATIONS,
    notifications
})

export const updateNotificationsAsync = notifications =>{

    return dispatch =>{
        dispatch(updateNotifications(notifications));
    }
}

// Mark Notification as read

export const markNotificationAsReadStart = ()=>({
    type: NotificationsActionTypes.MARK_NOTIFICATION_AS_READ_START
})
export const markNotificationAsReadSuccess = notification =>({
    type: NotificationsActionTypes.MARK_NOTIFICATION_AS_READ_SUCCESS,
    notification
})
export const markNotificationAsReadFailure = error =>({
    type: NotificationsActionTypes.MARK_NOTIFICATION_AS_READ_FAILURE,
    error
})

export const markNotificationAsReadAsync = (notifId)=>{

    return dispatch =>{
        dispatch(markNotificationAsReadStart());
        AxiosAgent.request('patch',`notifications/${notifId}/markasread`,null, null)
                .then(resp =>{
                        dispatch(markNotificationAsReadSuccess(resp.data));
                    }
                )
                .catch(err => {
                    console.log(err)
                    dispatch(markNotificationAsReadFailure(err));
                }
        );
    }
}



