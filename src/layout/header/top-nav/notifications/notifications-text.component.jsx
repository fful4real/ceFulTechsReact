import React from 'react'

const NotificationText = ({notifType, notifUserName})=>{
    switch (notifType) {
        case 'acceptInvitation':
            return (
                <div className="notifications-text">
                    <span className="text-dark text-capitalize">{notifUserName}</span> accepted you invitation
                </div>)
        case 'newMsg':
            return (
                <div className="notifications-text">
                    New message received from <span className="text-dark text-capitalize">{notifUserName}</span>
                </div>)
        case 'followUp':
            return (
                <div className="notifications-text">
                    New message received from <span className="text-dark text-capitalize">{notifUserName}</span>
                </div>)
        case 'applicationPendingApproval':
            return (
                <div className="notifications-text">
                    Application of <span className="text-dark text-capitalize">{notifUserName}</span> pending approval
                </div>)
    
        default:
            return (
                <div className="notifications-text">
                    <span className="text-dark text-capitalize">No notifications</span>
                </div>)
    }
}

export default NotificationText;
