import React from 'react'

const LastTenOrdersItem = ({profileImgUrl,customerName,createdDate,transactionStatus,transactionType,modifiedDate})=>{

    let badgeColor;
    switch (transactionStatus) {
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
            break;
    }
    return(
        <tr>
            <td>
                <img className="img-fluid rounded" src={profileImgUrl} alt="icon"/>
            </td>
            <td>{customerName}</td>
            <td>{createdDate}</td>
            <td><span className={`badge badge-soft-${badgeColor}`}>{transactionStatus}</span></td>
            <td>{transactionType}</td>
            <td>{modifiedDate}</td>
        </tr>
    )
}

export default LastTenOrdersItem;