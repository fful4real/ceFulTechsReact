import React from 'react'
import ListItems from '../../../../components/list/list-items'
import { numberWithCommas } from '../../../../helpers/helper'
import moment from 'moment'
const  OrderItemEntries = ({order})=> {
    // console.log(selectOrdersTableData
    const columns = [
        
        {
            name:'Created Date',
            selector: 'datec',
            sortable:true,
            cell: row => <div>
                            <span className="text-muted"><i className="icon-clock font-13"></i> { moment(row.datec).format("DD - MMM - YYYY")}</span>
                        </div>
        },
        {
            name:'Amount Processed',
            selector: 'processedAmount',
            sortable:true,
            cell: row => <div>
                            {`${numberWithCommas(row.processedAmount)} ${order.currencyOut.currencyCode}`}
                        </div>
        },
        {
            name:'From Account',
            selector: 'account',
            sortable:true,
            cell: row => <div>
                            {row.account.code}
                        </div>
        },
        {
            name:'Processd by',
            selector: 'createdBy',
            sortable:true,
            cell: row => <div>
                            {`${row.createdBy.firstName} ${row.createdBy.lastName}`}
                        </div>
        },
        {
            name:'Note',
            selector: 'note',
            sortable:true,
            cell: row => <div className="order-entry-note" style={{maxWidth:"200px"}}>
                            {row.note}
                        </div>
        }
    ]

    return (
            <ListItems columns={columns} data={order.orderEntries} />
        )

}

export default OrderItemEntries
