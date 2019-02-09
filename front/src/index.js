import React from 'react';
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

const App = () => {
    return (
        <Router>
            <div>
                <Provider store={store}>
                    <Route exact path="/" component={Profile} />
                </Provider> 
                <Provider store={store}>
                    <Route path="/settings" component={Settings} />
                </Provider> 
                <Provider store={guest}>
                    <Route path="/gg/:id" component={(props) => {
                        const myProps = {
                            ...props,
                            routerTime: (+(new Date))
                        };
                        
                        return <GuestComponent {...myProps} />
                    }} />
                </Provider>
                <Route path="/search" component={Search} />
                <Chat />
            </div>
        </Router>
    )
}

ReactDOM.render( <App />, document.getElementById('app') )
ReactDOM.render( <Provider store={headerStore}><Header /></Provider>, document.getElementById('header') )
