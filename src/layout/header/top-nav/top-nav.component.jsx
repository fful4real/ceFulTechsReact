import React from 'react'
import Logo from '../../../assets/img/logo.png'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
// import NavDropdown from 'react-bootstrap/NavDropdown'
import {Link} from 'react-router-dom'
import Notifications from './notifications/notifications.component'
import AuthenticationMenu from './authentication-menu/authentication-menu.layout'

const TopNavigation = ()=>(

        <React.Fragment>
            <Navbar collapseOnSelect expand="xl" className="hk-navbar" variant="dark" fixed="top">
                <Link id="navbar_toggle_btn" className="navbar-toggle-btn nav-link-hover" to="#">
                    <i className="ion ion-ios-menu"></i>
                </Link>
                <Navbar.Brand href="/">
                    <img className="brand-img d-inline-block mr-5" src={Logo} alt="brand" />FulTechs-
                </Navbar.Brand>
                <ul className="navbar-nav hk-navbar-content">
                    <li className="nav-item">
                        <Nav.Link href="#" id="navbar_search_btn" className="nav-link-hover">
                            <i className="ion ion-ios-search"></i>
                        </Nav.Link>
                    </li>
                    <Notifications />
                    <AuthenticationMenu/>
                </ul>
            </Navbar>
        </React.Fragment>
    )

    export default TopNavigation;
