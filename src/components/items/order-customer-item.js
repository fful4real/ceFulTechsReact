import React from 'react'

export default function OrderCustomerItem({firstName,id,toggleShow, lastName, mobileNumber,address,fkCity, CustomersOrders,handleCustomerClick, handleSentByClick}) {
    return (
            <div className="media dropdown-item" onClick={()=>{toggleShow({phoneNumber:'hide', sentBy:'hide'}); handleCustomerClick&&handleCustomerClick({firstName, lastName, mobileNumber, address, fkCity}); handleSentByClick&&handleSentByClick({firstName,lastName,id})}}>
                <div className="media-body">
                    <div>
                        <div className="user-name">{mobileNumber}</div>
                        <div className="user-last-chat">{`${firstName} ${lastName}`}</div>
                    </div>
                    <div>
                        <div className="last-chat-time block">orders</div>
                        <div className="badge badge-success badge-pill">{CustomersOrders.length&&CustomersOrders.length}</div>
                    </div>
                </div>
            </div>
    )
}
