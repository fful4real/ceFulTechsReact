import React from 'react'

const OrderItemNote = ({data})=> {
    return (
        <div className="card mb-0">
            <div className="card-body">{data.note}</div>
        </div>
    )
}

export default OrderItemNote
