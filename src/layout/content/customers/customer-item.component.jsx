import React from 'react'
import IosPersonOutline from 'react-ionicons/lib/IosPersonOutline'
import CustomerItemStyle from './customer-item.styles'

const CustomerItem = ({custAvatar,customerName, customerAddress, customerAmount, customerOrders, customerDate})=>{


    return(
        <CustomerItemStyle className="customer-item">
            <td>
                <div className="avatar avatar-xs">
                    <span className="avatar-text avatar-text-info rounded-circle"><span className="initial-wrap">
                        <span><IosPersonOutline fontSize="15px"/></span>
                    </span>
                    </span>
                </div>
                <span className="text-value">{customerName}</span></td>
            <td>{customerAddress}</td>
            <td>{customerAmount}</td>
            <td>{customerOrders}</td>
            <td>{customerDate}</td>
        </CustomerItemStyle>
    )
}

export default CustomerItem;