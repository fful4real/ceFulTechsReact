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
import { userFetchingAttempt } from './redux/user/user.action';
import { fetchCustomersAsync } from './redux/customers/customers.action';
import { fetchCurrenciesAsync } from './redux/currencies/currencies.action';
import { fetchCitiesAsync } from './redux/cities/cities.actions';
import { fetchStatusesAsync } from './redux/statuses/statuses.actions';
import { fetchOrdersAsync } from './redux/orders/orders.actions';
import { fetchAccountsAsync } from './redux/accounts/accounts.action';
<<<<<<< HEAD
=======
import { selectAuth } from './redux/auth/auth.selectors';
import { createStructuredSelector } from 'reselect'
import { selectIsFetchingOrders } from './redux/orders/orders.selectors';
import { selectIsFetchingAccounts } from './redux/accounts/accounts.selector';
import { selectIsFetchingCustomers } from './redux/customers/customers.selectors';
import { selectIsFetchingCities } from './redux/cities/cities.selectors';
import { selectIsFetchingCurrencies } from './redux/currencies/currencies.selectors';
import { selectIsFetchingStatuses } from './redux/statuses/statuses.selectors';
import LoadingApp from './layout/content/loading-app';
>>>>>>> b17fb8b

class App extends React.Component{
  compReady = false;
  componentDidMount() {
    FulTechs();
    this.compReady = true;
    const userId = window.localStorage.getItem('userId');
    this.props.userFetchingAttempt(userId)
    this.props.fetchOrdersAsync()
    this.props.fetchCustomersAsync()
    this.props.fetchCurrenciesAsync()
    this.props.fetchCitiesAsync()
    this.props.fetchStatusesAsync()
    this.props.fetchAccountsAsync()
  }
  UNSAFE_componentWillMount(){
    const userId = window.localStorage.getItem('userId');
    const token = window.localStorage.getItem('token')
    this.props.userSetAuth({token, userId})
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
  let finishedLoadingApp = false;
  if(this.compReady)
    finishedLoadingApp = !this.props.selectIsFetchingOrders&&
                        !this.props.selectIsFetchingAccounts&&
                        !this.props.selectIsFetchingCustomers&&
                        !this.props.selectIsFetchingCities&&
                        !this.props.selectIsFetchingCurrencies&&
                        !this.props.selectIsFetchingStatuses;
                        

    return !token ? <Redirect to='/login'  /> : 
    this.props.orders.isFetching||
    this.props.currrencies.isFetchingCurrencies||
    this.props.customers.isFetchingCustomers? <span>Loading...</span> :
    (
      <div className="hk-wrapper hk-horizontal-nav">
        <FulTechsStyle/>
        <HeaderContainer />
        {!finishedLoadingApp ? <LoadingApp />: <ContentContainer/>}
        <FooterContent />
      </div>
    );
  }
}

<<<<<<< HEAD

const mapStateToProps = rootReducerState =>({
  auth:rootReducerState.auth,
  orders:rootReducerState.orders,
  currrencies: rootReducerState.currencies,
  customers:rootReducerState.customers
});
=======
const mapStateToProps = createStructuredSelector({
  auth:selectAuth,
  selectIsFetchingOrders,
  selectIsFetchingAccounts,
  selectIsFetchingCustomers,
  selectIsFetchingCities,
  selectIsFetchingCurrencies,
  selectIsFetchingStatuses,
})
>>>>>>> b17fb8b

const mapDispatchToProps = {
  userSetAuth,
  fetchOrdersAsync,
  userFetchingAttempt,
  fetchCustomersAsync,
  fetchCurrenciesAsync,
  fetchCitiesAsync,
  fetchStatusesAsync,
  fetchAccountsAsync
}


export default connect(mapStateToProps,mapDispatchToProps)(App);