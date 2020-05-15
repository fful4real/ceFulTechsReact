
import React from 'react'
import { AlertContainer } from './alert.style'
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectModalAlert } from '../../redux/fultechs/FultechsSelectors';

const ModalAlert = ({modalAlert}) =>{
    return (
        modalAlert.show==='show'&&<div className="relative-position" style={{width:'100%'}}>
            <AlertContainer>
                <div className={`alert alert-${modalAlert.variant} alert-wth-icon alert-dismissible fade ${modalAlert.show}`} role="alert">
                    <span className="alert-icon-wrap"><i className={`zmdi zmdi-${modalAlert.icon}`}></i></span> {modalAlert.message}
                    <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
            </AlertContainer>
        </div>
    )
}

const mapStateToProps = createStructuredSelector({
    modalAlert: selectModalAlert
})

export default connect(mapStateToProps)(ModalAlert)
   
                                            
                                            
                                            