import React from 'react'
import { numberWithCommas } from '../../../../helpers/helper'

const DisplayCustomerProfileOrderDetail = ({attr})=>{
    
    return (
        <li className="list-group-item d-flex align-items-center justify-content-between" style={{minHeight:'73px'}}>
            <span>
                <span className={`badge badge-${attr.badge} badge-pill mr-15`}>{attr.count}</span>{attr.label}
            </span>
            <span>
                {attr.amountIn&&<span>
                    <span>
                        <i className={`ion icon-arrow-${attr.topArrow} text-${attr.topArrowClass} font-11 mr-10`}></i>{attr.currencyIn} {numberWithCommas(attr.amountIn)}
                    </span>
                    <span className='d-block'>
                        <i className={`ion icon-arrow-${attr.bottomArrow} text-${attr.bottomArrowClass} font-11 mr-10`}></i>{attr.currencyOut} {numberWithCommas(attr.amountOut)}
                    </span>
                </span>}
            </span>
        </li>
    )
}

export default DisplayCustomerProfileOrderDetail
