import React from 'react'
import {Link} from 'react-router-dom'
import MaterialIcon from 'react-material-iconic-font';
import NotificationText from './notifications-text.component';

const NotificationItem = ({avatarUrl,avatarIco, notifType, notifTime, notifUserName, avatarStyle})=>
    (
        <div>
            <Link to="#" className="dropdown-item">
                <div className="media">
                    <div className="media-img-wrap">
                        <div className="avatar avatar-sm">
                            {
                                avatarUrl?(
                                    <img src={avatarUrl}  alt="user" className="avatar-img rounded-circle"/>
                                ):(
                                    <span className={`avatar-text ${avatarStyle} rounded-circle`}>
                                        <span className="initial-wrap">
                                            <span>
                                                <MaterialIcon type={avatarIco} />
                                            </span>
                                        </span>
                                    </span>
                                )
                            }
                        </div>
                    </div>
                    <div className="media-body">
                        <div>
                            <NotificationText notifType={notifType} notifUserName={notifUserName}/>
                            <div className="notifications-time">{notifTime}</div>
                        </div>
                    </div>
                </div>
            </Link>
            <div className="dropdown-divider"></div>
        </div>
    )

export default NotificationItem;