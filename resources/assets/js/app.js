
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom'

// import components
import Dialogs from './components/dialogs';
import Dialog from './components/dialog';
import GGWSC, {user} from './components/websocket';
import socketStore from './store/socket';
import MessageNotification from './components/notifications/message';

if(document.getElementById('conversation')){
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
  ), document.getElementById('conversation'));
}

if(user){
  const s = new GGWSC(socketStore);
  ReactDOM.render(
    <MessageNotification trigger={socketStore}/>, 
    document.getElementById('pushs')
  );
}

require('./global');