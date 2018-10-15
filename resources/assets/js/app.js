
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, withRouter } from 'react-router-dom'

// import components
import Dialogs from './components/dialogs';
import Dialog from './components/dialog';
import GGWSC, {user} from './components/websocket';
import socketStore from './store/socket';
import MessageNotification from './components/notifications/message';
import Auth from './components/auth';
import ResetPasswordRequest from './components/auth/login/reset-password-request';
import ResetPassword from './components/auth/login/reset-password';


if(document.getElementById('login-register')){
    ReactDOM.render((
        <Router>
            <div>
                <Route path="/login" component={
                    withRouter(
                        props => {
                            return <Auth {...props}/>;
                        }
                    )
                }/>
                <Route path="/register" component={
                    withRouter(
                        props => {
                            return <Auth {...props}/>;
                        }
                    )
                }/>
                <Route path="/password/reset/*" component={ResetPassword}/>
                <Route exact path="/password/reset" component={ResetPasswordRequest}/>
            </div>
        </Router>
    ),document.getElementById('login-register'));
}

if(document.getElementById('app')){
  ReactDOM.render((
    <Router>
      <div>
          <Route path="/im" component={Dialogs}/>
          <Route path="/dialog/:id"
                render={(props) => <Dialog id={props.match.params.id} 
                trigger={socketStore}/>} 
          />
      </div>
    </Router>
  ), document.getElementById('app'));
}

if(user){
  const s = new GGWSC(socketStore);
  ReactDOM.render(
    <MessageNotification trigger={socketStore}/>, 
    document.getElementById('pushs')
  );
}

require('./global');
require('./profile');