import React from 'react';
import HeaderContainer from './layout/header/header-container.component';
import FulTechs from './assets/js/fultechs'
import './app.styles.scss'
import ContentContainer from './layout/content/content-container';
import FulTechsStyle from './global-style.styles';
import FooterContent from './layout/footer/footer.component';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import AxiosAgent from './axios-agent';
import { userSetAuth } from './redux/auth/auth.action';

class App extends React.Component{

  componentDidMount() {
    FulTechs();
    this.props.userSetAuth({token:window.localStorage.getItem('token'), userId:window.localStorage.getItem('userId')})
    console.log(this.props.auth)
  }

  componentDidUpdate(prevprops){
  }
  

  render(){
    
    const {auth}=this.props
    let {token} = auth
    if(!token){
      token = window.localStorage.getItem('token');
      token&&AxiosAgent.setToken(token)
    }

    return !token ? <Redirect to='/login'  /> : (
      <div className="hk-wrapper hk-horizontal-nav">
        <FulTechsStyle/>
        <HeaderContainer />
        <ContentContainer/>
        <FooterContent />
      </div>
    );
  }
}

const mapStateToProps = rootReducerState =>({
  auth:rootReducerState.auth
});

const mapDispatchToProps = {
  userSetAuth
}

export default connect(mapStateToProps,mapDispatchToProps)(App);