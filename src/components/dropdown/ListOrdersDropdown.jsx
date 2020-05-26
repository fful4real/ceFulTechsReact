import React from 'react'
import { Dropdown } from 'react-bootstrap'
import { uid } from 'react-uid'

const ListOrdersDropdown = ({statuses, status, statusClassName, handleStatus}) => {
    return (
        <div className="select-orders mr-10 cursor-pointer">
            <Dropdown className="d-inline">
                <Dropdown.Toggle id="dropdown-basic">
                    <span aria-expanded="false" role="button">
                        <i className={`ion ion-ios-analytics ${statusClassName}`} style={{fontSize:"1.5em"}}></i>
                    </span>
                </Dropdown.Toggle>
                <Dropdown.Menu className="dropdown-menu-right" style={{position: "absolute", transform: "translate3d(13px, 21px, 0px)", top: "0px", left: "0px", willChange: "transform"}}>

                    {statuses.map(statusMap=>
                            (
                                <Dropdown.Item key={`status-${uid(statusMap.id)}`} href="#" className={`${status?status.className===statusMap.className?"text-success":'':''}`} onClick={()=>handleStatus(statusMap)}>{statusMap.statusLabel}</Dropdown.Item>)
                        )
                    }
                        <Dropdown.Divider />
                        <Dropdown.Item href="#" onClick={()=>handleStatus('')} >View all Orders</Dropdown.Item>
                
                </Dropdown.Menu>
            </Dropdown>
        </div>
    )
}

export default ListOrdersDropdown
