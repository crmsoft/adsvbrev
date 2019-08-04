import React, {Component} from 'react';
import Messenger from './Messenger';
import Dialogs from './Dialogs';
import {Provider} from 'react-redux';
import store from './redux/store';
import socketStore from '../socket/redux/store';
import {
    MESSAGE,
    CHAT_MESSAGES_READ,
    USER_WENT_ONLINE,
    USER_WENT_OFFLINE
} from '../socket/redux/events';
import {
    load_chats, 
    CHAT_CLOSED, 
    MARK_MESSAGES_AS_READ, 
    INC_CHAT_UNREAD, 
    CLOSE_CHAT,
    CHAT_READ,
    USER_STATUS_OFFLINE,
    USER_STATUS_ONLINE
} from './redux/events';
import newMessageSound from './sounds/NewMessage';

export default class Chat extends Component{
    state = {
        activeChats: []
    }

    componentDidMount(){
        this.unsubscribeFromMainStore = store.subscribe(() => {

            const {action, chatToClose} = store.getState();  
            
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

        this.unsubscribeFromSocketStore = socketStore.subscribe(() => {
            const {received, data} = socketStore.getState();  
            const {messenger} = store.getState();
            
            newMessageSound.toggle( messenger.m_sound === 'off' );
            
            if( received === MESSAGE )
            {
                const is_chat_open = this.state.activeChats.filter(chat => chat.hash_id === data);
                
                if(is_chat_open.length)
                {                    
                    this.setState(() => {
                        return {
                            pullChat: data
                        }
                    }, () => {
                        this.setState(() => {
                            return {
                                pullChat: undefined
                            }
                        })
                    });

                    return;
                }
                else  
                {
                    const is_new_chat = messenger.chat.filter(chat => chat.hash_id === data);
                    
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

            if (received === CHAT_MESSAGES_READ)
            {
                store.dispatch({
                    type: MARK_MESSAGES_AS_READ,
                    data: data
                })
            } // end if

            if (received === USER_WENT_ONLINE || received === USER_WENT_OFFLINE)
            {
                store.dispatch({
                    type: received === USER_WENT_ONLINE ? USER_STATUS_ONLINE : USER_STATUS_OFFLINE,
                    data: data
                })
            } // end if
        })
    }

    componentWillUnmount(){
        if(this.unsubscribeFromMainStore)
        {
            this.unsubscribeFromMainStore();
        } //end if 

        if (this.unsubscribeFromSocketStore)
        {
            this.unsubscribeFromSocketStore();
        } // end if
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
            store.dispatch({type: CHAT_READ, data: newChat})
        });
    }

    render(){
        return (
            <div className="chat">
                <Dialogs 
                    pullChat={this.state.pullChat}
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