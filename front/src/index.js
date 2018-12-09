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
            </div>
        </Router>
    )
}

ReactDOM.render( <App />, document.getElementById('app') )

// axios.interceptors.response.use(response => {
//     return response;
// }, error => {
//     // if the session is expired
//     // should't at all actually
//     if(error.response && (error.response.status == 401)){
//         window.location.reload();
//     }
// });