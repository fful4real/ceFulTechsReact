import React, { Component } from 'react';
import FulTechsStyle from '../global-style.styles';
import HeaderContainer from './header/header-container.component';
import LoadingApp from './content/loading-app';
import ContentContainer from './content/content-container';
import FooterContent from './footer/footer.component';
import { connect } from 'react-redux';
import { fetchAllOrdersAsync } from '../redux/orders/orders.actions';
import { createStructuredSelector } from 'reselect';
import { selectFultechsRefreshTimeInterval, selectRedirectLink, selectIsAppLoaded } from '../redux/fultechs/FultechsSelectors';
import { fetchAllCustomersAsync } from '../redux/customers/customers.action';
import { Redirect } from 'react-router-dom';
import { fetchAllAccountsAsync } from '../redux/accounts/accounts.action';
import { fetchAllAccountEntriesAsync } from '../redux/accountEntries/AccountEntriesAction';
import { selectUser } from '../redux/user/user.selectors';
import { fetchNotificationsAsync } from '../redux/notifications/NotificationsActions';

class CashExpress extends Component {
    constructor(props){
        super(props)
        this.state = {
            refreshInterval:''
        }
    }
    componentDidMount() {
        const {
            refreshTime,
            fetchAllAccounts, 
            fetchAllCustomers,
            fetchAllOrders, 
            isAppLoaded,
            user,
            fetchNotifications
        }= this.props
        this.setState({
            ...this.state,
            refreshInterval: isAppLoaded?setInterval(() => {
                fetchAllOrders()
                fetchAllCustomers()
                fetchAllAccounts()
                fetchNotifications(user.id)
            }, refreshTime):''
        })
    }

    UNSAFE_componentWillReceiveProps(nextProps) {

    }

    componentDidUpdate(prevProps, prevState) {
        const {
            redirectLink, 
            isAppLoaded, 
            fetchAllOrders, 
            fetchAllCustomers, 
            fetchAllAccounts, 
            refreshTime,
            fetchAllAccountEntries,
            user,
            fetchNotifications
        } = this.props
        if (prevProps.redirectLink!==redirectLink) {
            return <Redirect to='/customers'  />
        }
        if(prevProps.isAppLoaded!==isAppLoaded){
            this.setState({
                ...this.state, 
                refreshInterval: setInterval(() => {
                    fetchAllOrders()
                    fetchAllCustomers()
                    fetchAllAccounts()
                    fetchAllAccountEntries()
                    fetchNotifications(user.id)
                }, refreshTime)
            })
        }
    }

    componentWillUnmount() {
        clearInterval(this.state.refreshInterval)
        this.setState({
            ...this.state,
            refreshInterval:''
        })
    }

    render() {
        const {loadApp}=this.props
        return (
            <div className="hk-wrapper hk-horizontal-nav">
                <FulTechsStyle/>
                <HeaderContainer />
                {!loadApp ? <LoadingApp />: <ContentContainer/>}
                <FooterContent />
            </div>
        )
    }
}

const mapDispatchToProps = {
    fetchAllOrders : fetchAllOrdersAsync,
    fetchAllCustomers: fetchAllCustomersAsync,
    fetchAllAccounts: fetchAllAccountsAsync,
    fetchAllAccountEntries: fetchAllAccountEntriesAsync,
    fetchNotifications: fetchNotificationsAsync
}

const mapStateToProps = createStructuredSelector({
    refreshTime: selectFultechsRefreshTimeInterval,
    redirectLink: selectRedirectLink,
    isAppLoaded: selectIsAppLoaded,
    user: selectUser
})

export default connect(mapStateToProps, mapDispatchToProps)(CashExpress);