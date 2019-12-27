const MenuNavData = [
    {
        menuItemIco:'keypad',
        menuItemLabel:'Dashboard',
        menuItemUrl:'/',
        menuItemSubmenus:''
    },
    {
        menuItemIco:'paper',
        menuItemLabel:'Orders',
        menuItemUrl:'/orders',
        menuItemSubmenus:[
            {
                subMenuLabel:'Place order',
                subMenuUrl:'/order/create'
            }
        ]
    },
    {
        menuItemIco:'people',
        menuItemLabel:'Customers',
        menuItemUrl:'/customers',
        menuItemSubmenus:''
    },
    {
        menuItemIco:'calculator',
        menuItemLabel:'Accounts',
        menuItemUrl:'/accounts',
        menuItemSubmenus:''
    }
]

export default MenuNavData;