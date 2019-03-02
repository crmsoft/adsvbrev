import React, {Fragment} from 'react';
import ReactDOM from 'react-dom';
import { Provider  } from "react-redux";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import axios from 'axios';
//import $ from '../node_modules/jquery/dist/jquery.min';
//import '../node_modules/bootstrap/dist/js/bootstrap';

import Profile from './profile/profile';
import GuestComponent from './profile/guest/GuestComponent';
import store, {guest} from './profile/fetch/store';
import Settings from './settings/settings';
import Search from './search';
import Chat from './chat';
import Header from './header/index';
import headerStore from './header/store';
import Schedule from './schedule/Schedule';

const App = () => {
    return (
        <Router>
            <Fragment>
                <Provider store={headerStore}>
                    <Header />
                </Provider>
                <div className="container">
                    <Provider store={store}>
                        <Route exact path="/" component={Profile} />
                    </Provider> 
                    <Provider store={store}>
                        <Route path="/settings" component={Settings} />
                    </Provider> 
                    <Provider store={guest}>
                        <Route path="/gg/:id" component={GuestComponent} />
                    </Provider>
                    <Route path="/search" component={Search} />
                    <Route path="/schedule" component={Schedule} />
                </div>
                <Chat />
            </Fragment>
        </Router>
    )
}

ReactDOM.render( <App />, document.getElementById('app') )
