import React from 'react'
import Avatar10 from '../../../../assets/img/avatar10.jpg'
import {Link} from 'react-router-dom'
import { connect } from 'react-redux';
import Spinner from '../../../../components/spinner/spinner';
import { userDestroyAuthAttemp } from '../../../../redux/auth/auth.action';
import { createStructuredSelector } from 'reselect';
import { selectUser } from '../../../../redux/user/user.selectors';
import { capitalizeFirstLetter } from '../../../../helpers/helper';
import { Dropdown } from 'react-bootstrap';
import { ImageUrl } from '../../../../api-route';

const AuthenticationMenu = ({user, signOut})=> {
    let firstName=null, lastName =null
    if(user!==null){
        lastName = user.lastName?user.lastName.toUpperCase():user.lastName
        firstName = user.firstName?capitalizeFirstLetter(user.firstName):user.firstName
    }

    return (
        <Dropdown className="nav-item dropdown-authentication">
            <Dropdown.Toggle variant="link" className="no-caret nav-link" id="dropdown-basic">
                <div className="media">
                    <div className="media-img-wrap">
                        <div className="avatar">
                            {!firstName?
                                <Spinner spinnerHeight="40px" spinnerFontSize="1.7em" spinnerRight="0p" style={{right:'10px'}}/>:
                                <img src={user.profileImage.url?ImageUrl+user.profileImage.url:Avatar10} alt="user" className="avatar-img rounded-circle"/>
                            }
                        </div>
                        {firstName&&<span className="badge badge-success badge-indicator" style={{top:"25px"}}></span>}
                    </div>
                    <div className="media-body">
                        {!firstName?
                            <span>Loading...</span> :
                            <span>{`${firstName}  ${lastName}`}<i className="zmdi zmdi-chevron-down"></i></span>
                        }
                    </div>
                </div>
            </Dropdown.Toggle>
            <Dropdown.Menu>
                <Link className="dropdown-item" to={`/users/${user?user.id:'1'}`}><i className="dropdown-icon zmdi zmdi-account text-primary"></i><span>Profile</span></Link>
                <Link className="dropdown-item" to="#" onClick={()=>signOut()}><i className="dropdown-icon zmdi zmdi-power text-danger"></i><span>Log out</span></Link>
            </Dropdown.Menu>
        </Dropdown>
    )
    
};

const mapStateToProps = createStructuredSelector({
    user:selectUser,
});

const mapDispatchToProps = {
    signOut:userDestroyAuthAttemp
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthenticationMenu);
