import React from 'react'
import { Link } from 'react-router-dom'

import './analysed-orders.styles.scss'

const AnalysedOrders = ()=>{

    return(
        <div className="col-lg-6" style={{display:'none'}}>
            <div className="card card-refresh">
                <div className="refresh-container">
                    <div className="loader-pendulums"></div>
                </div>
                <div className="card-header card-header-action">
                    <div>
                        <h6 className="mb-10">XYZ - Orders Analysis (2016 - 2019)</h6>
                    </div>
                    <div className="d-flex align-items-center card-action-wrap">
                        <Link to="#" className="inline-block refresh mr-15">
                            <i className="ion ion-md-radio-button-off"></i>
                        </Link>
                        <Link to="#" className="inline-block full-screen">
                            <i className="ion ion-md-expand"></i>
                        </Link>
                    </div>
                </div>
                <div className="card-body">
                    <div id="e_chart_1" style={{height: "194px",minHeight: "404px"}}>
                        <h3>Chart Goes Here</h3>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AnalysedOrders;