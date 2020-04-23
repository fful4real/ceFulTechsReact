import React from 'react'
import Spinner from '../../components/spinner/spinner'

const LoadingApp = () =>{
    
    return(
        <div className="hk-pg-wrapper">
            <div className="container mt-xl-30 mt-sm-20 mt-15">
                <h4 className="text-center hk-pg-title">Loading App...</h4>
                <Spinner />
            </div>
        </div>
    ) 
    
}

export default LoadingApp;