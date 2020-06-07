import React from 'react'
import NOTIFICATIONS from './notifications.data'
import NotifictionItem from './notifications-item.component'
import {uid} from 'react-uid'
import { createStructuredSelector } from 'reselect'
import { selectNotifications } from '../../../../redux/notifications/NotificationsSelectors'
import { connect } from 'react-redux'
import MaterialIcon from 'react-material-iconic-font';
import { Link } from 'react-router-dom'
import { ImageUrl } from '../../../../api-route'
import { selectNotificationIcons } from '../../../../redux/fultechs/FultechsSelectors'
import Moment from 'react-moment'
import { markNotificationAsReadAsync, updateNotificationsAsync } from '../../../../redux/notifications/NotificationsActions'

const NotificationsList = ({notifications, notifIcons, markAsRead, updateNotifications})=>{
    
    const handleMarkAsRead = (notifId)=>{
        const newNotifs = notifications.filter(notif=>notif.id!==notifId)
        updateNotifications(newNotifs)
        markAsRead(notifId)
    }

    return(
                <>
                    {
                        notifications&&notifications.map(notif=>(
                            <div key={uid({notif})}>
                                <Link to={notifIcons[notif.entity[0]].link} className="dropdown-item" onClick={()=>handleMarkAsRead(notif.id)}>
                                    <div className="media">
                                        <div className="media-img-wrap">
                                            <div className="avatar avatar-sm">
                                                {
                                                    false?(
                                                        <img src={ImageUrl}  alt="user" className="avatar-img rounded-circle"/>
                                                    ):(
                                                        <span className={`avatar-text ${notifIcons[notif.entity[0]].className}  rounded-circle`}>
                                                            <span className="initial-wrap">
                                                                <span>
                                                                    <MaterialIcon type={notifIcons[notif.entity[0]].icon} />
                                                                </span>
                                                            </span>
                                                        </span>
                                                    )
                                                }
                                            </div>
                                        </div>
                                        <div className="media-body">
                                            <div>
                                                <div className="notifications-text">
                                                    <span className="text-dark">{notif.type.code==='NEW'?(<span>A new <strong>{notif.entity[0].replace("ce","")}</strong> has been created</span>):notif.message}</span>
                                                </div>
                                                <div className="notifications-time">
                                                    <Moment date={notif.datec}  durationFromNow />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                                <div className="dropdown-divider"></div>
                            </div>
    
                        ))
                    }
                </>
    )
}
const mapStateToProps = createStructuredSelector({
    notifications: selectNotifications,
    notifIcons: selectNotificationIcons,
})

const mapDispatchToProps = {
    markAsRead : markNotificationAsReadAsync,
    updateNotifications: updateNotificationsAsync
}
export default connect(mapStateToProps, mapDispatchToProps)(NotificationsList);