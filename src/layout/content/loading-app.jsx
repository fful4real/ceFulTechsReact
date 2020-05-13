import React from 'react'
import Spinner from '../../components/spinner/spinner'

const LoadingApp = () =>{
    
    return(
        <div className="hk-pg-wrapper">
            <div className="container mt-xl-30 mt-sm-20 mt-15">
                <div className="d-flex justify-content-center">
                    <h4 className="text-center hk-pg-title">FulTechs CashXpress</h4>
                </div>
                <div className="d-flex justify-content-center">
                    <Spinner />
                </div>
            </div>
        </div>
    ) 
    
}

export default LoadingApp;