import React, {Component} from 'react';
import Users from './Users';
import Dialogs from './Dialogs';
import {Provider} from 'react-redux';
import store from './redux/store';
import {CHAT_CLOSED} from './redux/events';

export default class Chat extends Component{
    state = {
        activeChats: []
    }

    componentDidMount(){
        store.subscribe(() => {
            const {chatToClose} = store.getState();
            if(!chatToClose || this.state.activeChats.length === 0)
            {
                return 0;
            }
            const actives = this.state.activeChats.filter(
                chat => chat.hash_id !== chatToClose
            )
            
            this.setState({
                activeChats: actives
            }, () => {
                store.dispatch({type:CHAT_CLOSED, data: chatToClose})
            });
        });
    }

    componentWillUnmount(){
        // TODO: unsubscribe here
    }

    addChat( hash )
    {
        const chat_exists = this.state.activeChats.filter(chat => chat === hash);

        if(chat_exists.length)
        {
            return;
        } // end if

        this.setState({
            activeChats: [
                ...this.state.activeChats,
                hash
            ]
        });
    }

    render(){
        return (
            <div className="chat">
                <Provider store={store}>
                    <Users 
                        onChat={this.addChat.bind(this)}
                    />
                </Provider>
                <Dialogs 
                    chats={this.state.activeChats}
                />
            </div>
        )
    }
}