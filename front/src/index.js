import React, {Fragment} from 'react';
import ReactDOM from 'react-dom';
import { Provider  } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";
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

import EventProfile from './event/EventProfile';
import EventProfileStore from './event/redux/store';

import FDudes from './find-dude';
import socketStore from './socket/redux/store';

import GamePage from './games/index';
import gameStore from './games/store';

import GroupPage from './groups/index';
import groupStore from './groups/store';

import Feed from './feed';
import RouteListeners from './detached/route-listeners';

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
                    <Provider store={EventProfileStore}>
                        <Route path="/event/:id" component={EventProfile} />
                    </Provider>
                    <Provider store={socketStore}>
                        <Route path="/dudes" component={FDudes} />
                    </Provider>
                    <Route path="/feed" component={Feed} />
                    <Provider store={gameStore}>
                        <Route path="/g/:id" component={GamePage} />
                    </Provider>
                    <Provider store={groupStore}>
                        <Route path="/gr/:id" component={GroupPage} />
                    </Provider>
                    <RouteListeners />
                </div>
                <Chat />
            </Fragment>
        </Router>
    )
}

class ErrorBoundary extends React.Component {
    constructor(props) {
      super(props);
      this.state = { hasError: false };
    }
  
    static getDerivedStateFromError(error) {
      
      // redirect to home page in case previous error cached more then 5s ago
      if ((((+(new Date)) - localStorage.getItem('err')) / 1000) > 5) { 
        localStorage.getItem('err', +(new Date));
        window.location.href = '/';
      } // end if

      // Update state so the next render will show the fallback UI.
      return { hasError: true };
    }
  
    componentDidCatch(error, errorInfo) {
      // You can also log the error to an error reporting service
      console.log(error, errorInfo);
    }
  
    render() {
      if (this.state.hasError) {
        // You can render any custom fallback UI
        return <small>an error. redirecting to home page.</small>;
      }
  
      return this.props.children; 
    }
  }

ReactDOM.render( 
<ErrorBoundary>
    <App />
</ErrorBoundary>
, document.getElementById('app') )


import socket from './socket';