import React,{useEffect} from 'react';
import HeaderContainer from './layout/header/header-container.component';
import FulTechs from './assets/js/fultechs'
import './app.styles.scss'
import ContentContainer from './layout/content/content-container';
import FulTechsStyle from './global-style.styles';
import FooterContent from './layout/footer/footer.component';
import { connect } from 'react-redux';
import axios from 'axios'
import { Redirect } from 'react-router-dom';


function App({auth}) {
  useEffect(() => {
    FulTechs();
  }, [])
  let token = auth.token;
  if(!token){
    token = window.localStorage.getItem('token');
    token&&axios.interceptors.request.use(
      config => {
      console.log(`${config.method.toUpperCase()} request sent to ${config.url}`);
      return {
        ...config,
        headers: {
          Authorization:`Bearer ${token}`
        }
      }
      },
      error => console.error(error)

    );
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

const mapStateToProps = rootReducerState =>({
  auth:rootReducerState.auth
});

export default connect(mapStateToProps)(App);