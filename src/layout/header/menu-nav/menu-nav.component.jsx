import React from 'react'
import { Link } from 'react-router-dom';
import MenuNavList from './menu-nav-list.component';

const MenuNav = ()=> {

    return (
        <nav className="hk-nav hk-nav-light">
            <Link to="#" id="hk_nav_close" className="hk-nav-close">
                <span className="feather-icon"><i data-feather="x"></i></span>
            </Link>
            <div className="nicescroll-bar">
                <div className="navbar-nav-wrap">
                    <MenuNavList/>
                </div>
            </div>
        </nav>
    )
}

export default MenuNav;
