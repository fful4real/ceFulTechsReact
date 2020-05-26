import React from 'react'
import { createStructuredSelector } from 'reselect'
import avatar2 from '../../../../assets/img/avatar2.jpg'
import { selectOrdersProcessedByUser, selectOrdersCreatedByUser, selectHighestProcessedOrderByUser, selectLeastProcessedOrderByUser, selectOrdersAbandonedByUser } from '../../../../redux/orders/orders.selectors'
import { connect } from 'react-redux'
import { selectUser } from '../../../../redux/user/user.selectors'
import { capitalizeFirstLetter } from '../../../../helpers/helper'
import { Tabs, Tab } from 'react-bootstrap'
import ListOrders from '../../../../components/list/ListOrders'

const UserProfileContentOrders = ({ordersProcessed, ordersCreated,ordersAbandoned, user}) => {
    const hasProcessedOrders = ordersProcessed.length?true:false
    const hasCreatedOrders = ordersCreated.length?true:false
    const hasAbandonedOrders = ordersAbandoned.length?true:false
    const hasOrders = hasCreatedOrders||hasProcessedOrders||hasAbandonedOrders
    // console.log(ordersProcessed)
    return (
        <div className="col-lg-8">
            <div className="card card-profile-feed">
                <div className="card-header card-header-action">
                    <div className="media align-items-center">
                        <div className="media-img-wrap d-flex mr-10">
                            <div className="avatar avatar-sm">
                                <img src={avatar2} alt="user" className="avatar-img rounded-circle"/>
                            </div>
                        </div>
                        <div className="media-body">
                            <div className="text-capitalize font-weight-500 text-dark">{`${capitalizeFirstLetter(user.firstName)} ${user.lastName.toUpperCase()}`}</div>
                            <div className="font-13">{user.profession}</div>
                        </div>
                    </div>
                </div>
                {hasOrders&&<div className="card-body">
                    <Tabs defaultActiveKey="created" id="uncontrolled-tab-example">
                        {hasCreatedOrders&&<Tab eventKey="created" title="Created Orders">
                            <ListOrders tableData={ordersCreated}/>
                        </Tab>}
                        {hasProcessedOrders&&<Tab eventKey="processed" title="Processed Orders">
                            <ListOrders tableData={ordersProcessed}/>
                        </Tab>}
                        {hasAbandonedOrders&&<Tab eventKey="abandoned" title="Abandoned Orders">
                            <ListOrders tableData={ordersAbandoned}/>
                        </Tab>}
                    </Tabs>
                </div>}
            </div>
        </div>
    )
}

const mapStateToProps = createStructuredSelector({
    ordersProcessed: selectOrdersProcessedByUser,
    ordersCreated: selectOrdersCreatedByUser,
    ordersAbandoned: selectOrdersAbandonedByUser,
    highestOrder: selectHighestProcessedOrderByUser,
    leastOrder: selectLeastProcessedOrderByUser,
    user: selectUser
})

export default connect(mapStateToProps)(UserProfileContentOrders)
