import React from 'react'
import avatar7 from '../../../../assets/img/avatar7.jpg'
import { Link } from 'react-router-dom'
import { numberWithCommas } from '../../../../helpers/helper'
import { createStructuredSelector } from 'reselect'
import { selectOrdersProcessedByUser,selectLeastProcessedOrderByUser, selectOrdersCreatedByUser, selectHighestProcessedOrderByUser, selectOrdersAbandonedByUser } from '../../../../redux/orders/orders.selectors'
import { connect } from 'react-redux'
import FulTechsTooltip from '../../../../components/FulTechsTooltip'
import { selectUser } from '../../../../redux/user/user.selectors'

const UserProfileContentOrderDetails = ({highestOrder,ordersAbandoned, leastOrder,user, ordersProcessed, ordersCreated}) => {
    const hasOrdersProcessed = ordersProcessed.length?true:false
    const hasCreatedOrders = ordersCreated.length?true:false
    const hasAbandonedOrders = ordersAbandoned.length?true:false
    
    return (
        <div className="col-lg-4">
            <div className="card card-profile-feed">
                <div className="card-header card-header-action">
                    <div className="media align-items-center">
                        <div className="media-img-wrap d-flex mr-10">
                            <div className="avatar avatar-sm">
                                <img src={avatar7} alt="user" className="avatar-img rounded-circle"/>
                            </div>
                        </div>
                        <div className="media-body">
                            <div className="text-capitalize font-weight-500 text-dark">Order details</div>
                        </div>
                    </div>
                    <i className="ion ion-ios-settings font-18"></i>
                </div>
                <div className="row text-center">
                    <div className="col-4 border-right pr-0">
                        <div className="pa-15">
                            <span className="d-block display-6 text-dark mb-5">{hasCreatedOrders?ordersCreated.length:0}</span>
                            <span className="d-block text-capitalize font-14">Created</span>
                        </div>
                    </div>
                    <div className="col-4 border-right px-0">
                        <div className="pa-15">
                            <span className="d-block display-6 text-dark mb-5">{ordersProcessed?ordersProcessed.length:0}</span>
                            <span className="d-block text-capitalize font-14">Processed</span>
                        </div>
                    </div>
                    <div className="col-4 pl-0">
                        <div className="pa-15">
                            <span className="d-block display-6 text-dark mb-5">{hasAbandonedOrders?ordersAbandoned.length:0}</span>
                            <span className="d-block text-capitalize font-14">Abandoned</span>
                        </div>
                    </div>
                </div>
                <ul className="list-group list-group-flush">
                    <FulTechsTooltip tooltipMessage="Order processed with highest amount">
                        <li className="list-group-item">
                            <Link to={highestOrder?`/orders/${highestOrder.id}`:"#"} className="d-flex text-dark justify-content-between" data-toggle="tooltip" data-placement="top" title="" data-original-title="Processed order with smallest amount in XAF">
                                <span>
                                    <i className="avatar avatar-xs d-10 bg-success rounded-circle mr-10"></i>
                                    <span>Highest :</span>
                                </span>
                                <span className="ml-5 text-dark">{ highestOrder?numberWithCommas(highestOrder.amountOut):0} XAF</span>
                            </Link>
                        </li>
                    </FulTechsTooltip>
                    <FulTechsTooltip tooltipMessage="Order processed with the least amount">
                        <li className="list-group-item">
                            <Link to={leastOrder?`/orders/${leastOrder.id}`:"#"} className="d-flex text-dark justify-content-between" data-toggle="tooltip" data-placement="top" title="" data-original-title="Processed order with smallest amount in XAF">
                                <span>
                                    <i className="avatar avatar-xs d-10 bg-warning rounded-circle mr-10"></i>
                                    <span>Least :</span>
                                </span>
                                <span className="ml-5 text-dark">{ leastOrder?numberWithCommas(leastOrder.amountOut):0} XAF</span>
                            </Link>
                        </li>
                    </FulTechsTooltip>
                    <FulTechsTooltip tooltipMessage="Latest processed order">
                        <li className="list-group-item">
                            <Link to={hasOrdersProcessed?`/orders/${ordersProcessed[0].id}`:"#"} className="d-flex text-dark justify-content-between" data-toggle="tooltip" data-placement="top" title="" data-original-title="Processed order with smallest amount in XAF">
                                <span>
                                    <i className="avatar avatar-xs d-10 bg-blue rounded-circle mr-10"></i>
                                    <span>Latest :</span>
                                </span>
                                <span className="ml-5 text-dark">{ hasOrdersProcessed?numberWithCommas(ordersProcessed[0].amountOut):0} {hasOrdersProcessed?ordersProcessed[0].currencyOut.currencyCode:''}</span>
                            </Link>
                        </li>
                    </FulTechsTooltip>
                </ul>
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

export default connect(mapStateToProps)(UserProfileContentOrderDetails)
