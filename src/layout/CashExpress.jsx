import React, { Component } from 'react';
import FulTechsStyle from '../global-style.styles';
import HeaderContainer from './header/header-container.component';
import LoadingApp from './content/loading-app';
import ContentContainer from './content/content-container';
import FooterContent from './footer/footer.component';
import { connect } from 'react-redux';
import { fetchAllOrdersAsync } from '../redux/orders/orders.actions';
import { createStructuredSelector } from 'reselect';
import { selectFultechsRefreshTimeInterval, selectRedirectLink } from '../redux/fultechs/FultechsSelectors';
import { fetchAllCustomersAsync } from '../redux/customers/customers.action';
import { Redirect } from 'react-router-dom';

class CashExpress extends Component {
    constructor(props){
        super(props)
        this.state = {
            refreshInterval:''
        }
    }
    componentDidMount() {
        const {refreshTime, fetchAllCustomers,fetchAllOrders}= this.props
        this.setState({
            ...this.state,
            refreshInterval: setInterval(() => {
                fetchAllOrders()
                fetchAllCustomers()
            }, refreshTime)
        })
    }

    componentWillReceiveProps(nextProps) {

    }

    componentDidUpdate(prevProps, prevState) {
        const {redirectLink} = this.props
        if (prevProps.redirectLink!==redirectLink) {
            return <Redirect to='/customers'  />
        }
    }

    componentWillUnmount() {
        clearInterval(this.state.refreshInterval)
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
    fetchAllCustomers: fetchAllCustomersAsync
}

const mapStateToProps = createStructuredSelector({
    refreshTime: selectFultechsRefreshTimeInterval,
    redirectLink: selectRedirectLink
})

export default connect(mapStateToProps, mapDispatchToProps)(CashExpress);