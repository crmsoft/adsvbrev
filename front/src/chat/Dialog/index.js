import React, {Component} from 'react';
import Input from './Input';
import {
    m_sended,
    close_chat
} from '../redux/events';
import socket from '../redux/socket';
import axios from 'axios';
import { connect } from 'react-redux';
import Message from './Message';
import Header from './DialogHead';

class DialogComponent extends Component{

    onMessage(message)
    {
        const hash = this.props.chat.hash_id;
        axios.post(`/chat/${hash}/message`, {
            message: message
        }).then(response => {
            this.props.sended(hash);
        });   
    }

    closeChat()
    {
        this.props.close( this.props.chat.hash_id ); 
    }

    render(){    
        console.log(this.props);
            
        return (
            <div className="dialog">
                <Header members={this.props.chat.members} 
                        closeChat={this.closeChat.bind(this)}
                        me={this.props.messenger.username}
                />
                <div className="message-container">
                    {
                        this.props.chat.messages.map((m,index) => {
                            return <Message key={index} message={m} />
                        })
                    }
                </div>
                <Input 
                    onMessage={this.onMessage.bind(this)} 
                />
            </div>
        )
    }
}

const Dialog = connect(
    state => {
        return {
            ...state
        }
    },
    dispatch => {
        return {
            sended: hash => dispatch(m_sended(hash)),
            close: hash => dispatch(close_chat(hash))
        }
    }
)(DialogComponent);

export default Dialog;