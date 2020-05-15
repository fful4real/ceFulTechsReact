import React from 'react';
import FulTechs from './assets/js/fultechs'
import './app.styles.scss'
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import AxiosAgent from './axios-agent';
import { userSetAuth } from './redux/auth/auth.action';
import { userFetchingAttempt } from './redux/user/user.action';
import { fetchCustomersAsync } from './redux/customers/customers.action';
import { fetchCurrenciesAsync } from './redux/currencies/currencies.action';
import { fetchCitiesAsync } from './redux/cities/cities.actions';
import { fetchStatusesAsync } from './redux/statuses/statuses.actions';
import { fetchOrdersAsync, fetchAllOrdersAsync } from './redux/orders/orders.actions';
import { fetchAccountsAsync } from './redux/accounts/accounts.action';
import { selectAuthState } from './redux/auth/auth.selectors';
import { createStructuredSelector } from 'reselect'
import { selectIsFetchingOrders } from './redux/orders/orders.selectors';
import { selectIsFetchingAccounts } from './redux/accounts/accounts.selector';
import { selectIsFetchingCustomers } from './redux/customers/customers.selectors';
import { selectIsFetchingCities } from './redux/cities/cities.selectors';
import { selectIsFetchingCurrencies } from './redux/currencies/currencies.selectors';
import { selectIsFetchingStatuses } from './redux/statuses/statuses.selectors';
import CashExpress from './layout/CashExpress';

class App extends React.Component{
  compReady = false;
  componentDidMount() {
    FulTechs();
    const {
      fetchAllOrdersAsync, 
      userFetchingAttempt,
      fetchOrdersAsync,
      fetchCustomersAsync,
      fetchCurrenciesAsync,
      fetchCitiesAsync,
      fetchStatusesAsync,
      fetchAccountsAsync
    } = this.props
    this.compReady = true;
    const userId = window.localStorage.getItem('userId');
    userFetchingAttempt(userId)
    fetchOrdersAsync()
    fetchCustomersAsync()
    fetchCurrenciesAsync()
    fetchCitiesAsync()
    fetchStatusesAsync()
    fetchAccountsAsync()
    fetchAllOrdersAsync()
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
    let {token, isUserAuthenticated} = auth
    // console.log(isUserAuthenticated)
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
                        

    return !token||!isUserAuthenticated ? 
      <Redirect to='/login'  /> : 
      <CashExpress loadApp = {finishedLoadingApp}/>
    
  }
}

const mapStateToProps = createStructuredSelector({
  auth:selectAuthState,
  selectIsFetchingOrders,
  selectIsFetchingAccounts,
  selectIsFetchingCustomers,
  selectIsFetchingCities,
  selectIsFetchingCurrencies,
  selectIsFetchingStatuses,
})

const mapDispatchToProps = {
  userSetAuth,
  fetchOrdersAsync,
  userFetchingAttempt,
  fetchCustomersAsync,
  fetchCurrenciesAsync,
  fetchCitiesAsync,
  fetchStatusesAsync,
  fetchAccountsAsync,
  fetchAllOrdersAsync
}


export default connect(mapStateToProps,mapDispatchToProps)(App);