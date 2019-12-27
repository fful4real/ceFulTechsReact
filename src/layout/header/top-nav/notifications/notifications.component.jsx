import React from 'react'
import Nav from 'react-bootstrap/Nav'
import {Link} from 'react-router-dom'
import NotificationsList from './notifications-list.component'
import Scrollbars from 'react-custom-scrollbars';

const  Notifications = ()=> {
    return (
        <React.Fragment>
            <li className="nav-item dropdown dropdown-notifications">
                <Nav.Link href="#" className="dropdown-toggle no-caret" to="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <i className="ion ion-ios-notifications"></i>
                    <span className="badge-wrap">
                        <span className="badge badge-primary badge-indicator badge-indicator-sm badge-pill pulse"></span>
                    </span>
                </Nav.Link>
                    <div className="dropdown-menu dropdown-menu-right" data-dropdown-in="fadeIn" data-dropdown-out="fadeOut">
                        <h6 className="dropdown-header">Notifications <Link to="/" className="">View all</Link></h6>
                        <Scrollbars autoHide style={{height:"320px"}} >
                            <div className="notifications-nicescroll-bar">
                                <NotificationsList />
                            </div>
                        </Scrollbars>
                    </div>
            </li>
        </React.Fragment>             
    )
};

export default Notifications;
