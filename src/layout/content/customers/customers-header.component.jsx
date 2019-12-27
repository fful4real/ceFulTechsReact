import React from 'react';
import IosPersonAddOutline from 'react-ionicons/lib/IosPersonAddOutline'
import IosListBoxOutline from 'react-ionicons/lib/IosListBoxOutline'
import IosPeople from 'react-ionicons/lib/IosPeople'

const CustomersHeader = ()=>{

    return(
        <div className="hk-pg-header mb-10">
            <div>
                <h4 className="hk-pg-title">
                    <span className="pg-title-icon">
                        <span className="feather-icon">
                        </span>
                    </span> <IosPeople fontSize="30px" color="#c1c6c8"/>&nbsp;Customers
                </h4>
            </div>
            <div className="d-flex">
                <button className="btn btn-info btn-sm"><IosListBoxOutline color="#fff" /> List Customers&nbsp;</button>
                <button className="btn btn-primary btn-sm order-new"><IosPersonAddOutline color="#fff" /> Create New Customer&nbsp;</button>
            </div>
        </div>
    )
}

export default CustomersHeader;