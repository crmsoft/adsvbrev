import React, {Component} from 'react';
import Dialog from './Dialog';
import store from './redux/store';
import {Provider} from 'react-redux';

export default class Dialogs extends Component{
    render(){
        return (
            <div className="dialog-wrapper">

                {
                    this.props.chats.map(chat => {
                        return (
                            <Provider key={chat.hash_id} store={store}>
                                <Dialog chat={chat} />
                            </Provider>
                        )
                    })
                } 
            </div>
        )
    }
}