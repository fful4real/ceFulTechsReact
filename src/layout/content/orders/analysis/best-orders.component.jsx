import React from 'react'
import { Link } from 'react-router-dom'

import './best-orders.styles.scss'

const BestOrders = ()=>{

    return(
        <div className="col-lg-6" style={{display:'none'}}>
            <div className="card card-refresh">
                <div className="refresh-container">
                    <div className="loader-pendulums"></div>
                </div>
                <div className="card-header card-header-action">
                    <h6>Best Orders <small className="text-muted pl-10">&nbsp;by amount</small></h6>
                    <div className="d-flex align-items-center card-action-wrap">
                        <div className="inline-block dropdown">
                            <Link to="#" className="dropdown-toggle no-caret" data-toggle="dropdown" aria-expanded="false" role="button">
                                <i className="ion ion-ios-more"></i>
                            </Link>
                            <div className="dropdown-menu dropdown-menu-right">
                                <Link className="dropdown-item text-success" to="#">By amount</Link>
                                <Link className="dropdown-item" to="#">Of the month</Link>
                                <Link className="dropdown-item" to="#">Of the year</Link>
                                <div className="dropdown-divider"></div>
                                <Link className="dropdown-item" to="#">View all Orders</Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card-body">
                    <div className="table-wrap" style={{height: "194px",minHeight: "404px"}}>
                        <div className="table-responsive">
                            <table className="table table-sm table-hover mb-0">
                                <thead>
                                    <tr>
                                        <th>Rank</th>
                                        <th>Customer Name</th>
                                        <th> <span>Total Amount</span></th>
                                        <th><span>Total Orders</span></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>
                                            <div className="avatar avatar-sm">
                                                <span className="avatar-text avatar-text-success rounded-circle">
                                                        <span className="initial-wrap"><span><i className="zmdi zmdi-account font-18"></i></span></span>
                                                </span>
                                            </div>
                                        </td>
                                        <td>Felix FulTechs</td>
                                        <td>XAF 123K</td>
                                        <td>124</td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div className="avatar avatar-sm">
                                                <span className="avatar-text avatar-text-primary rounded-circle">
                                                        <span className="initial-wrap"><span><i className="zmdi zmdi-account font-18"></i></span></span>
                                                </span>
                                            </div>
                                        </td>
                                        <td>Karthik Technoforte</td>
                                        <td>XAF 724K</td>
                                        <td>56</td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div className="avatar avatar-sm">
                                                <span className="avatar-text avatar-text-info rounded-circle">
                                                        <span className="initial-wrap"><span><i className="zmdi zmdi-account font-18"></i></span></span>
                                                </span>
                                            </div>
                                        </td>
                                        <td>Shello Iowa</td>
                                        <td>XAF 724K</td>
                                        <td>56</td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div className="avatar avatar-sm">
                                                <span className="avatar-text avatar-text-danger rounded-circle">
                                                        <span className="initial-wrap"><span><i className="zmdi zmdi-account font-18"></i></span></span>
                                                </span>
                                            </div>
                                        </td>
                                        <td>Louis Claudette</td>
                                        <td>XAF 2m235k</td>
                                        <td>982</td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div className="avatar avatar-sm">
                                                <span className="avatar-text avatar-text-warning rounded-circle">
                                                        <span className="initial-wrap"><span><i className="zmdi zmdi-account font-18"></i></span></span>
                                                </span>
                                            </div>
                                        </td>
                                        <td>Imile Thanksona</td>
                                        <td>XAF 2m235k</td>
                                        <td>982</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BestOrders;