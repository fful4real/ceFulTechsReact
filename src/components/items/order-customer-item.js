import React from 'react'

export default function OrderCustomerItem({firstName,toggleShow, lastName, mobileNumber,address,fkCity, CustomersOrders,handleCustomerClick}) {
    return (
            <div className="media dropdown-item" onClick={()=>{toggleShow('hide');handleCustomerClick({firstName, lastName, mobileNumber, address, fkCity})}}>
                <div className="media-body">
                    <div>
                        <div className="user-name">{mobileNumber}</div>
                        <div className="user-last-chat">{`${firstName} ${lastName}`}</div>
                    </div>
                    <div>
                        <div className="last-chat-time block">orders</div>
                        <div className="badge badge-success badge-pill">{CustomersOrders.length}</div>
                    </div>
                </div>
            </div>
    )
}
