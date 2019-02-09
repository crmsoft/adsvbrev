import React,{Component} from 'react';
import {DateTime} from 'luxon';
import { placeEmoji } from '../../utils';

const MessageUserInfo = ({data}) => {
    const {user, created_at} = data;
    return (
        <div className="message-sender-info">
            <span className="message-user">
                {user.full_name}
            </span>
            <span className="message-time">
                {DateTime.fromMillis(created_at * 1000).toLocaleString(DateTime.TIME_24_SIMPLE)}
            </span>
        </div>
    )
}

const MessageUserAva = ({data}) => {
    const {user} = data;
    return (
        <div className="user-ava">
            <img src={user.ava} />
        </div>
    );
}

export default class Message extends Component{

    shouldComponentUpdate(props, state)
    {
        return this.props.message.id !== props.message.id;
    }

    render(){
        const {message} = this.props;
        const {showUser} = this.props;
        
        
        return (
            <div className="chat-message">
                { showUser ? <MessageUserAva data={message} /> : <div style={{width:34}}></div> }
                <div className="message">
                    { showUser ? <MessageUserInfo data={message} /> : null }
                    <div className="message-content">
                        <span className="message-text">
                            {placeEmoji(message.message)}
                        </span>
                        {
                            message.readed ? (
                                <span className="message-status readed"></span>
                            ) : null
                        }
                    </div>
                </div>
            </div>
        )
    }
}