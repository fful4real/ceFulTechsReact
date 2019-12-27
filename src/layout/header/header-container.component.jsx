import React from 'react'
import TopNavigation from '../header/top-nav/top-nav.component'
import MenuNav from './menu-nav/menu-nav.component'

const HeaderContainer = ()=> {
    return (
        <React.Fragment>
            <TopNavigation/>
            <MenuNav/>
        </React.Fragment>
    )
}

export default HeaderContainer;
