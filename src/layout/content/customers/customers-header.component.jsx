import React from 'react'
import IosPersonAddOutline from 'react-ionicons/lib/IosPersonAddOutline'
import IosListBoxOutline from 'react-ionicons/lib/IosListBoxOutline'
import IosPeople from 'react-ionicons/lib/IosPeople'
import { setCustomerModalAsync } from '../../../redux/customers/customers.action';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

const CustomersHeader = ({setModal})=>{
    const handleClick = ()=>{
        setModal('create');
    }

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
                <Link to="/customers/list" type="button" className="btn btn-info btn-sm"><IosListBoxOutline color="#fff" />&nbsp;List Customers&nbsp;</Link>
                <button className="btn btn-primary btn-sm order-new" onClick={handleClick}><IosPersonAddOutline color="#fff" /> Add Customer&nbsp;</button>
            </div>
        </div>
    )
}

const mapDispatchToProps = {
    setModal: setCustomerModalAsync,
}
export default connect(null,mapDispatchToProps)(CustomersHeader);