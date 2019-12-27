import React from 'react'
import MenuNavData from './menu-nav.data'
import MenuNavItem from './menu-nav-item.component'
import {uid} from 'react-uid'

const MenuNavList = ()=>{


    return (
        <ul className="navbar-nav flex-row">
            {
                MenuNavData.map(({menuItemSubmenus,...menuItemData})=>(
                    <MenuNavItem key={`menu-item-${uid({...menuItemData})}`} {...menuItemData} menuItemSubmenus={menuItemSubmenus} hasSubmenu={menuItemSubmenus?true:false} />
                ))
            }
        </ul>
    )
}

export default MenuNavList;