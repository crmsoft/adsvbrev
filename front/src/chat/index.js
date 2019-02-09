import React, {Component} from 'react';
import Messenger from './Messenger';
import Dialogs from './Dialogs';
import {Provider} from 'react-redux';
import store from './redux/store';
import {
    load_chats, 
    CHAT_CLOSED, 
    MESSAGE_RECIEVED, 
    INC_CHAT_UNREAD, 
    CLOSE_CHAT, 
    CHAT_READED
} from './redux/events';
import socket from './redux/socket';
import newMessageSound from './sounds/NewMessage';

export default class Chat extends Component{
    state = {
        activeChats: []
    }

    componentDidMount(){
        this.unsubscrubeFromMainStore = store.subscribe(() => {

            const {action, target, messenger, chatToClose} = store.getState();  
            
            newMessageSound.toggle( messenger.m_sound === 'off' );
            
            if( action === MESSAGE_RECIEVED )
            {
                const is_chat_open = this.state.activeChats.filter(chat => chat.hash_id === target);
                
                if(is_chat_open.length)
                {                    
                    // dispatch reload chat history
                    return;
                }
                else  
                {
                    const is_new_chat = messenger.chat.filter(chat => chat.hash_id === target);
                    
                    if( is_new_chat.length === 0)
                    {
                        store.dispatch(load_chats());
                    }
                    else
                    {
                        store.dispatch({type: INC_CHAT_UNREAD, data: is_new_chat.pop().hash_id});
                    }
                    newMessageSound.play();
                }
                
            } // end if

            
            if( action !== CLOSE_CHAT || !chatToClose || this.state.activeChats.length === 0)
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
        if(this.unsubscrubeFromMainStore)
        {
            this.unsubscrubeFromMainStore();
        }
    }

    addChat( newChat )
    {
        const chat_exists = this.state.activeChats.filter(chat => chat.hash_id === newChat.hash_id);

        if(chat_exists.length)
        {
            return;
        } // end if

        this.setState({
            activeChats: [
                ...this.state.activeChats,
                newChat
            ]
        }, () => {
            store.dispatch({type: CHAT_READED, data: newChat})
        });
    }

    render(){
        return (
            <div className="chat">
                <Dialogs 
                    chats={this.state.activeChats}
                />
                <Provider store={store}>
                    <Messenger 
                        onChat={this.addChat.bind(this)}
                    />
                </Provider>
            </div>
        )
    }
}