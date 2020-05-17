import React from 'react'
import ListOrders from '../../../../components/list/ListOrders'

const CustomerProfileOrders = ({orders})=> {
    const hasOrders = orders.received.length||orders.sent.length
    const hasReceived = orders.received.length?true:false
    const hasSent = orders.sent.length?true:false
    return (
        <React.Fragment>
            {
                hasOrders&&
                <div className="hk-row">
                    {hasReceived&&
                    <div className="col-xl-12">
                        <div className="hk-sec-wrapper">
                            <h5 className="hk-sec-title">Orders
                                <small className="text-muted pl-10">received</small>
                            </h5>
                            <ListOrders tableData={orders.received} receivedFrom={true} />
                        </div>
                    </div>}
                    {hasSent&&
                    <div className="col-xl-12">
                        <div className="hk-sec-wrapper">
                            <h5 className="hk-sec-title">Orders
                            <small className="text-muted pl-10">sent</small>
                            </h5>
                            <ListOrders tableData={orders.sent} />
                        </div>
                    </div>}
                </div>
            }
        </React.Fragment>
    )
}



export default CustomerProfileOrders
