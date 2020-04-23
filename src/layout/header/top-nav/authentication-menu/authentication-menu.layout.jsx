import React from 'react'
import Avatar10 from '../../../../assets/img/avatar10.jpg'
import {Link} from 'react-router-dom'
import Nav from 'react-bootstrap/Nav'
import { connect } from 'react-redux';
import Spinner from '../../../../components/spinner/spinner';

const AuthenticationMenu = ({user})=> {
    let firstName=null, lastName =null
    if(user.user!==null){
        lastName = user.user.lastName
        firstName = user.user.firstName
    }

    return (
    <li className="nav-item dropdown dropdown-authentication">
            <Nav.Link className="dropdown-toggle no-caret" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <div className="media">
                    <div className="media-img-wrap">
                        <div className="avatar">
                            {!firstName?
                                <Spinner spinnerHeight="40px" spinnerFontSize="1.7em" spinnerRight="0p" style={{right:'10px'}}/>:
                                <img src={Avatar10} alt="user" className="avatar-img rounded-circle"/>
                            }
                        </div>
                        {firstName&&<span className="badge badge-success badge-indicator"></span>}
                    </div>
                    <div className="media-body">
                        {!firstName?
                            <span>Loading...</span> :
                            <span>{`${firstName}  ${lastName}`}<i className="zmdi zmdi-chevron-down"></i></span>
                        }
                    </div>
                </div>
            </Nav.Link>
            <div className="dropdown-menu dropdown-menu-right" data-dropdown-in="flipInX" data-dropdown-out="flipOutX">
                <Link className="dropdown-item" to="profile.html"><i className="dropdown-icon zmdi zmdi-account"></i><span>Profile</span></Link>
                <Link className="dropdown-item" to="#"><i className="dropdown-icon zmdi zmdi-card"></i><span>My balance</span></Link>
                <Link className="dropdown-item" to="inbox.html"><i className="dropdown-icon zmdi zmdi-email"></i><span>Inbox</span></Link>
                <Link className="dropdown-item" to="#"><i className="dropdown-icon zmdi zmdi-settings"></i><span>Settings</span></Link>
                <div className="dropdown-divider"></div>
                <div className="sub-dropdown-menu show-on-hover">
                    <Link to="#" className="dropdown-toggle dropdown-item no-caret"><i className="zmdi zmdi-check text-success"></i>Online</Link>
                    <div className="dropdown-menu open-left-side">
                        <Link className="dropdown-item" to="#"><i className="dropdown-icon zmdi zmdi-check text-success"></i><span>Online</span></Link>
                        <Link className="dropdown-item" to="#"><i className="dropdown-icon zmdi zmdi-circle-o text-warning"></i><span>Busy</span></Link>
                        <Link className="dropdown-item" to="#"><i className="dropdown-icon zmdi zmdi-minus-circle-outline text-danger"></i><span>Offline</span></Link>
                    </div>
                </div>
                <div className="dropdown-divider"></div>
                <Link className="dropdown-item" to="#"><i className="dropdown-icon zmdi zmdi-power"></i><span>Log out</span></Link>
            </div>
        </li>)
    
};

const mapStateToProps = rootReducerState =>({
    user:rootReducerState.user,
    auth:rootReducerState.aut
});

export default connect(mapStateToProps)(AuthenticationMenu);
