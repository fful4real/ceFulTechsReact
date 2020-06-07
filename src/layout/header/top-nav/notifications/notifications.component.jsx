import React from 'react'
import Nav from 'react-bootstrap/Nav'
import {Link} from 'react-router-dom'
import NotificationsList from './notifications-list.component'
import Scrollbars from 'react-custom-scrollbars';
import { createStructuredSelector } from 'reselect';
import MaterialIcon from 'react-material-iconic-font';
import { ImageUrl } from '../../../../api-route'
import { selectNotifications } from '../../../../redux/notifications/NotificationsSelectors';
import { connect } from 'react-redux';

const  Notifications = ({notifications})=> {

    const hasNotifications = notifications.length?true:false

    return (
        <React.Fragment>
            <li className={`nav-item dropdown dropdown-notifications`}>
                <Nav.Link href="#" className="dropdown-toggle no-caret" to="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <i className="ion ion-ios-notifications"></i>
                    <span className="badge-wrap">
                        <span className={`badge badge-${hasNotifications?'danger':'secondary'} badge-indicator badge-indicator-sm badge-pill ${hasNotifications?"pulse":''}`}></span>
                    </span>
                </Nav.Link>
                <div className="dropdown-menu dropdown-menu-right" data-dropdown-in="fadeIn" data-dropdown-out="fadeOut">
                    <h6 className="dropdown-header">Notifications <Link to="/" className="">View all</Link></h6>
                    <Scrollbars autoHide style={{height:hasNotifications?'320px':'75px'}} >
                        <div className="notifications-nicescroll-bar">
                            {hasNotifications?<NotificationsList />:
                            
                        <Link to="#" className="dropdown-item">
                            <div className="media d-flex align-items-center">
                                <div className="media-img-wrap">
                                    <div className="avatar avatar-sm">
                                        {
                                            false?(
                                                <img src={ImageUrl}  alt="user" className="avatar-img rounded-circle"/>
                                            ):(
                                                <span className={`avatar-text avatar-text-info  rounded-circle`}>
                                                    <span className="initial-wrap">
                                                        <span>
                                                            <MaterialIcon type='notifications-none' />
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
                                            <span className="text-dark">No new notifications</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                            }
                        </div>
                    </Scrollbars>
                </div>
            </li>
        </React.Fragment>             
    )
}


const mapStateToProps = createStructuredSelector({
    notifications: selectNotifications,
})

export default connect(mapStateToProps)(Notifications)
