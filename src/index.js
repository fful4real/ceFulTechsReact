import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route, Router } from 'react-router-dom';
import {Provider} from 'react-redux';
import store from './redux/store.redux'

import App from './App';


import * as serviceWorker from './serviceWorker';
import LoginContainer from './layout/login/login.container';
import history from './history';

ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            <BrowserRouter>
                <Switch>
                    <Route path="/login" component={LoginContainer} />
                    <Route path="/" component={App} />
                </Switch>
            </BrowserRouter>
        </Router>
    </Provider>, 
    document.getElementById('root')
    );

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
