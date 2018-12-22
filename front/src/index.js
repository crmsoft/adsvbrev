import React from 'react';
import ReactDOM from 'react-dom';
import { Provider  } from "react-redux";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import axios from 'axios';
//import '../node_modules/bootstrap/js/src/dropdown';

import Profile from './profile/profile';
import GuestComponent from './profile/guest/GuestComponent';
import store, {guest} from './profile/fetch/store';
import Settings from './settings/settings';
import Search from './search';
import Chat from './chat';

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
                    <Route path="/gg/:id" component={GuestComponent} />
                </Provider>
                <Route path="/search" component={Search} />
                <Chat />
            </div>
        </Router>
    )
}

ReactDOM.render( <App />, document.getElementById('app') )
