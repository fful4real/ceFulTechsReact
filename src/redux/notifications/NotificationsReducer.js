import NotificationsActionTypes from "./NotificationsTypes";


const INITIAL_STATE = {
    notifications:[],
    isFetchingNotifications:false,
    error:null,
    isMarkingNotificationAsRead: false
}

// let notifications = []

const NotificationsReducer = (state=INITIAL_STATE,action)=>{
    switch (action.type) {
        case NotificationsActionTypes.NOTIFICATIONS_FETCHING_START:
            return{
                ...state,
                isFetchingNotifications:true,
            }
        
        case NotificationsActionTypes.NOTIFICATIONS_FETCHING_SUCCESS:
            return{
                ...state,
                isFetchingNotifications:false,
                notifications: action.notifications['hydra:member']
            }

        case NotificationsActionTypes.NOTIFICATIONS_FETCHING_FAILURE:
            return{
                ...state,
                isFetchingNotifications:false,
                error: action.error
            }
        case NotificationsActionTypes.UPDATE_NOTIFICATIONS:
            return{
                ...state,
                notifications:action.notifications
            }
        
        case NotificationsActionTypes.MARK_NOTIFICATION_AS_READ_START:
            return{
                ...state,
                isMarkingNotificationAsRead: true
            }
        
        case NotificationsActionTypes.MARK_NOTIFICATION_AS_READ_SUCCESS:
            const notifications = state.notifications.filter(notif=>notif.id!==action.notification.id)
            return{
                ...state,
                isMarkingNotificationAsRead: false,
                notifications
            }
        
        case NotificationsActionTypes.MARK_NOTIFICATION_AS_READ_FAILURE:
            
            return{
                ...state,
                isMarkingNotificationAsRead: false,
                error: action.error
            }
    
        default:
            return state;
    }
}

export default NotificationsReducer;