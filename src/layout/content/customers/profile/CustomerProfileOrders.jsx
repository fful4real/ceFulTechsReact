import React,{ useState } from 'react'
import ListOrders from '../../../../components/list/ListOrders'

const CustomerProfileOrders = ({orders})=> {
    const [currentPage, setCurrentPage] = useState(1),
        hasOrders = orders.received.length||orders.sent.length?true:false,
        sentCount = orders.sent.length,
        receivedCount = orders.received.length,
        hasReceived = receivedCount?true:false,
        hasSent = sentCount?true:false
    
    return (
        <React.Fragment>
            {
                hasOrders&&
                <div className="hk-row">
                    {hasReceived&&
                    <div className="col-xl-12">
                        <div className="hk-sec-wrapper">
                            <h5 className="hk-sec-title">Orders
                                <small className="text-muted pl-10">received&nbsp;({receivedCount})</small>
                            </h5>
                            <ListOrders currentPage={currentPage} setPage={setCurrentPage} tableData={orders.received} receivedFrom={true} />
                        </div>
                    </div>}
                    {hasSent&&
                    <div className="col-xl-12">
                        <div className="hk-sec-wrapper">
                            <h5 className="hk-sec-title">Orders
                            <small className="text-muted pl-10">sent ({sentCount})</small>
                            </h5>
                            <ListOrders currentPage={currentPage} setPage={setCurrentPage} tableData={orders.sent} />
                        </div>
                    </div>}
                </div>
            }
        </React.Fragment>
    )
}



export default CustomerProfileOrders
