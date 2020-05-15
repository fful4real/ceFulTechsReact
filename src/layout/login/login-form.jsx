import React, { Component } from 'react'
import {reduxForm, Field} from 'redux-form'
import RenderField from '../../components/form/render-field'
import { connect } from 'react-redux'
import { userLoginAttempt } from '../../redux/auth/auth.action'
import Spinner from '../../components/spinner/spinner'
import Alert from '../../components/alert/alert'
import { createStructuredSelector } from 'reselect'
import { selectAuthState } from '../../redux/auth/auth.selectors'


class LoginForm extends Component {

    onSubmit = values =>{
        return this.props.userLoginAttempt(values.username, values.password)
    }

    render(){
        const {handleSubmit, auth} = this.props;
        const textColor = auth.isLogging?'text-grey':'';

        console.log(textColor)

        return(
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))} className="relative-position">
                <div className="login-error" style={{maxWidth:'500px',position:'relative', margin:"0px 18px 0px auto"}}>
                    {auth.loginFailed&&<Alert show="show" alertType='danger' alertText='Invalid login!' />}
                </div>
                    <p className="text-center mb-30">Sign in to your account.</p>
                    <div className="form-group">
                        <Field name="username" required={true} placeholder="Username" disabled={auth.isLogging} label="Username" type="text" className="form-control" component={RenderField}/>
                    </div>
                    <div className="form-group">
                        
                    </div>
                    <div className="form-group">
                        <div className="input-group">
                            <Field name="password" disabled={auth.isLogging} className="form-control" label="Password" type="password" placeholder="Password" component={RenderField}/>
                            <div className="input-group-append">
                                <span className="input-group-text">
                                    <span className={`feather-icon ${textColor}}`}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-eye-off"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>
                                    </span>
                                </span>
                            </div>
                        </div>
                    </div>
                    <button className="btn btn-warning btn-block" type="submit" disabled={auth.isLogging} style={{cursor:auth.isLogging&&'progress'}}>
                        {
                            auth.isLogging? <Spinner spinnerHeight="24px" spinnerFontSize="1.2em" spinnerRight="48%"/>: "Login"
                        }
                    </button>
                </form>
        )

    }
}

const mapDispatchToProps = {
    userLoginAttempt
}
const mapStateToProps = createStructuredSelector({
    auth: selectAuthState
})

export default reduxForm({
    form:'LoginForm'
})(connect(mapStateToProps, mapDispatchToProps)(LoginForm))
