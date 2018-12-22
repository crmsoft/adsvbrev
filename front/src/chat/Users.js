import React, {Component} from 'react';
import {connect} from 'react-redux';
import User from './User';
import Chat from './Chat';
import {load_chats} from './redux/events';

class UsersComponent extends Component {

    componentDidMount(){
        this.props.loadChats();
    }

    createChat( username ){
        
        axios.post(`/chats/${username}/start`)
        .then(response => console.log(response))
        .catch(err => console.log(err))
        
    }

    startConversation( chat ){
        
        this.props.onChat(chat);

    }

    render(){
        
        const {friend, chat} = this.props.messenger;
        
        return (
            <div className="chat-wrapper">
                <div className="header">
                    <span className="title">
                        Messenger
                    </span>
                </div>
                <div className="chatable">
                    <div className="chats">
                    {
                        chat.map(chat => {
                            return <Chat 
                                        onClick={ this.startConversation.bind(this) }
                                        key={chat.hash_id} 
                                        data={chat}
                                    />
                        })
                    }
                    </div>
                    <div className="users">
                    {
                        friend.map(user => {
                            return <User 
                                        key={user.username} 
                                        onClick={ this.createChat.bind(this) } 
                                        data={user} 
                                    />
                        })            
                    }
                    </div>
                </div>
            </div>
        )
    }
}

const Users = connect(
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

export default Users;