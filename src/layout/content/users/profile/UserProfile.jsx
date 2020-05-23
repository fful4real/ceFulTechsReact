import React from 'react'
import bg1 from '../../../../assets/img/gallery/profile_bg.jpg'
import avatar1 from '../../../../assets/img/gallery/profile-image-png-8.png'
import { createStructuredSelector } from 'reselect'
import { selectUser } from '../../../../redux/user/user.selectors'
import { connect } from 'react-redux'
import { capitalizeFirstLetter } from '../../../../helpers/helper'
import { Link } from 'react-router-dom'

const UserProfile = ({user}) => {
    let firstName=null, lastName =null
    if(user!==null){
        lastName = user.lastName?user.lastName.toUpperCase():user.lastName
        firstName = user.firstName?capitalizeFirstLetter(user.firstName):user.firstName
    }
    return (
        <div className="row">
            <div className="col-xl-12 pa-0">
                <div className="profile-cover-wrap overlay-wrap">
                    <div className="profile-cover-img" style={{backgroundImage:`url(${bg1})`}}></div>
                    <div className="bg-overlay bg-trans-dark-60"></div>
                    <div className="container profile-cover-content py-50 px-30">
                        <div className="hk-row">
                            <div className="col-lg-6">
                                <div className="media align-items-center">
                                    <div className="media-img-wrap  d-flex">
                                        <div className="avatar">
                                            <img src={avatar1} alt="user" className="avatar-img rounded-circle"/>
                                        </div>
                                    </div>
                                    <div className="media-body">
                                        <div className="text-white text-capitalize display-6 font-weight-400 mb-10">{firstName}&nbsp;{lastName}</div>
                                        <div className="font-14 text-white mb-5">
                                            {user.email&&<span className="mr-5">
                                                <span className="font-weight-500 pr-5">
                                                    <i className="ion ion-md-mail font-weight-500 mr-5"></i>Email:&nbsp;
                                                </span>
                                                <span className="mr-5">{user.email}</span>
                                            </span>}
                                        </div>
                                        {user.mobileNumber&&<div className="font-14 text-white mb-5">
                                            {user.email&&<span className="mr-5">
                                                <span className="font-weight-500 pr-5">
                                                    <i className="ion ion-md-call font-weight-400 mr-5"></i>Phone:&nbsp;
                                                </span>
                                                <span className="mr-5">{user.mobileNumber}</span>
                                            </span>}
                                        </div>}
                                        {user.address&&<div className="font-14 text-white mb-5">
                                            {user.email&&<span className="mr-5">
                                                <span className="font-weight-500 pr-5">
                                                    <i className="ion ion-md-pin font-weight-400 mr-5"></i>Address:&nbsp;
                                                </span>
                                                <span className="mr-5">{user.address}</span>
                                            </span>}
                                        </div>}
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="button-list" style={{height:'inherit'}}>
                                    <Link to="#" className="btn btn-dark btn-wth-icon icon-wthot-bg btn-rounded">
                                        <span className="btn-text">Message</span>
                                        <span className="icon-label">
                                            <i className="icon ion-md-mail"></i> 
                                        </span>
                                    </Link>
                                    <Link to="#" className="btn btn-icon btn-icon-circle btn-indigo btn-icon-style-2">
                                        <span className="btn-icon-wrap">
                                            <i className="fa fa-facebook"></i>
                                        </span>
                                    </Link>
                                    <Link to="#" className="btn btn-icon btn-icon-circle btn-sky btn-icon-style-2"><span className="btn-icon-wrap"><i className="fa fa-twitter"></i></span></Link>
                                    <Link to="#" className="btn btn-icon btn-icon-circle btn-purple btn-icon-style-2"><span className="btn-icon-wrap"><i className="fa fa-instagram"></i></span></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = createStructuredSelector({
    user: selectUser
})
export default connect(mapStateToProps)(UserProfile)
