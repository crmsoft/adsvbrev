import React, {Component} from 'react';
import {connect} from 'react-redux';
import User from './User';
import Chat from './Chat';
import {load_chats} from './redux/events';
import Popup from 'reactjs-popup';
import MessengerOptions from './MessengerOptions';
import axios from 'axios';

const ChatList = ({chats, startConversation, user}) => {
    return (
        <div className="chats">
        {
            chats.map(chat => {
                return <Chat 
                            user={user}
                            onClick={ startConversation }
                            key={chat.hash_id} 
                            data={chat}
                        />
            })
        }
        </div>
    )
}

const UserList = ({friends, createChat}) => {
    return (
        <div className="users">
        {
            friends.map(user => {
                return <User 
                            key={user.username} 
                            onClick={ createChat } 
                            data={user} 
                        />
            })            
        }
        </div>
    )
}

class UsersComponent extends Component {

    state = {
        minimized: localStorage.getItem('minimized') === 'true'
    }

    componentDidMount(){
        this.props.loadChats();
    }

    createChat( username ){
        
        axios.post(`/chats/${username}/start`)
        .then(({data}) => {
            this.startConversation(data.data);
            //this.props.loadChats();
        })
        .catch(err => console.log(err))
        
    }

    startConversation( chat ){
        
        this.props.onChat(chat);

    }

    minimizeMessenger(){
        this.setState(() => {
            return {
                minimized: !this.state.minimized
            }
        }, () => {
            localStorage.setItem('minimized', this.state.minimized);
        });
    }

    render(){
        
        const {
            friend, 
            chat, 
            m_status,
            m_sound,
            username
        } = this.props.messenger;

        // no messenger when no friends;
        if(!friend.length)
        {
            return null;
        }
        
        return (
            <div className={this.state.minimized ? "chat-wrapper minimized" : "chat-wrapper"}>
                <div className="header">
                    <span className={`title ${m_status}`}>
                        Messenger
                    </span>
                    <div className="chat-actions">
                        <span 
                            onClick={this.minimizeMessenger.bind(this)} 
                            className="minimize"
                        >
                            &#x2693;
                        </span>
                        <Popup
                            className="options-pop-up"
                            contentStyle={popupStyle}
                            position="top right"
                            overlayStyle={{display:'none'}}
                            lockScroll={false}
                            closeOnEscape={true}
                            modal={false}
                            trigger={<span className="settings">&#x26EF;</span>}
                        >
                            <MessengerOptions status={m_status} sound={m_sound} />
                        </Popup>
                    </div>
                </div>
                {
                    this.state.minimized ? null : (
                        <div className="chatable">
                            <ChatList 
                                user={username}
                                chats={chat} 
                                startConversation={this.startConversation.bind(this)}
                            />
                            <UserList 
                                friends={friend}
                                createChat={this.createChat.bind(this)} 
                            />
                        </div>
                    )
                }
            </div>
        )
    }
}

const popupStyle = {
    width:'270px', 
    padding: 0, 
    border: 0, 
    backgroundColor: 'transparent',
    left: 0
}

const Messenger = connect(
    state => {
        return {
            ...state
        }
    },
    dispatch => {
        return {
            loadChats: () => dispatch(load_chats()),
            startChat: username => dispatch()
        }
    }
)(UsersComponent)

export default Messenger;