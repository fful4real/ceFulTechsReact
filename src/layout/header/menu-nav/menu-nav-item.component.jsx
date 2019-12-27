import React from 'react'
import {Link} from 'react-router-dom'
import { uid } from 'react-uid'
import Caret from './menu-nav.styles';

const HorizontalSubMenu = ({subMenuLabel,subMenuUrl})=>(
    <li className="nav-item">
        <Link to={subMenuUrl} className="nav-link">
            {subMenuLabel}
        </Link>
    </li>
)

const MenuNavItem = ({hasSubmenu,menuItemIco,menuItemLabel,menuItemUrl,menuItemSubmenus})=>{

    
    // const MenuItem = components[menuItemIco];

    return hasSubmenu ? (
        <li className="nav-item">
            <Link to={menuItemUrl} className="nav-link" data-target="#dash_drp">
                <i className={`ion ion-ios-${menuItemIco}`}></i>
                <span className="nav-link-text">{menuItemLabel}</span>
                <Caret className="zmdi zmdi-chevron-down"/>
            </Link>
            <ul className="nav flex-column collapse collapse-level-1">
                {
                    menuItemSubmenus.map(({...subItems})=>(
                        <HorizontalSubMenu key={uid({...subItems})} {...subItems} />
                    ))
                }
            </ul>
        </li>
    ):(
        <li className="nav-item">
            <Link to={menuItemUrl} className="nav-link" data-target="#dash_drp">
            <i className={`ion ion-ios-${menuItemIco}`}></i>
                <span className="nav-link-text">{menuItemLabel}</span>
            </Link>
        </li>
    );
}
    
;

export default MenuNavItem;