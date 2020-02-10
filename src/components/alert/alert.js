
import React from 'react'
import { AlertContainer } from './alert.style'

export default function Alert({alertTop="", alertType='success',show="hide", alertText='Order Created Successfully',alertIcon='pin'}) {
    return (
        <div className="relative-position" style={{width:'100%'}}>
        <AlertContainer>
            <div className={`alert alert-${alertType} alert-wth-icon alert-dismissible fade show`} role="alert">
                <span className="alert-icon-wrap"><i className={`zmdi zmdi-${alertIcon}`}></i></span> {alertText}
                <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
        </AlertContainer>
        </div>
    )
}
   
                                            
                                            
                                            