import React from 'react'
import { numberWithCommas, capitalizeFirstLetter } from '../../../../helpers/helper';
import moment from 'moment';

const LastTenOrdersItem = ({profileImgUrl,orderRef,customer,amountOut,status,datec, datem})=>{

    let badgeColor;
    switch (status.className) {
        case 'progress':
            badgeColor='primary';
            break;
        case 'success':
            badgeColor='success';
            break;
        case 'abandoned':
            badgeColor='danger';
            break;
    
        default:
            badgeColor='info';
            break;
    }
    return(
        <tr>
            <td>
                {orderRef}
            </td>
            <td>{`${capitalizeFirstLetter(customer.firstName)} ${customer.lastName.toUpperCase()}`}</td>
            <td>{numberWithCommas(amountOut)}</td>
            <td><span className={`badge badge-soft-${badgeColor}`}>{status.statusLabel}</span></td>
            <td>{moment(datec).format("DD - MMM - YYYY")}</td>
            <td>{moment(datem).format("DD - MMM - YYYY")}</td>
        </tr>
    )
}

export default LastTenOrdersItem;