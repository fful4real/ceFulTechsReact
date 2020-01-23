import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import Logo from '../../assets/img/logo.png'
import LoginForm from './login-form'
import { connect } from 'react-redux'

class LoginContainer extends React.Component{
    componentDidUpdate(prevprops){
        if(prevprops.auth.token !== this.props.auth.token)
            this.props.history.push('/')
    }

    render(){
        return (
            <div className="hk-pg-wrapper hk-auth-wrapper">
                <header className="d-flex justify-content-end align-items-center">
                    <div className="btn-group btn-group-sm">
                        <Link to="/"  className="btn btn-outline-secondary">Help</Link>
                        <Link to="#" className="btn btn-outline-secondary">About Us</Link>
                    </div>
                </header>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-xl-12 pa-0">
                            <div className="auth-form-wrap pt-xl-0 pt-70">
                                <div className="auth-form w-xl-30 w-lg-55 w-sm-75 w-100">
                                    <h3 className="d-flex auth-brand align-items-center justify-content-center mb-20">
                                        <img className="brand-img d-inline-block mr-5" src={Logo} alt="brand"/>
                                        <span className="text-dark font-23">FulTechs</span> 
                                    </h3>
                                    <LoginForm />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = rootReducerState =>({
    auth:rootReducerState.auth
  });

export default connect(mapStateToProps)(withRouter(LoginContainer)); 
