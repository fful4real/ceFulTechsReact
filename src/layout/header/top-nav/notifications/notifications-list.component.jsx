import React from 'react'
import NOTIFICATIONS from './notifications.data'
import NotifictionItem from './notifications-item.component'
import {uid} from 'react-uid'

const NotificationsList = ()=>{

    return(
                <>
                    {
                        NOTIFICATIONS.map(({...notification})=>(
                                <NotifictionItem  key={uid({...notification})} {...notification} />
                        ))
                    }
                </>
    )
}

export default NotificationsList;