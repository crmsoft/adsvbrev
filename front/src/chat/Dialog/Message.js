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

    constructor(props)
    {
        super(props);
        
        this.state = {...props};
    }

    render(){
        const {message} = this.state;
        const {showUser} = this.state;
        const {author} = this.state;
        
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
                            author ? (
                                message.readed ? (
                                    <span className="message-status readed"></span>
                                ) : <span className="message-status"></span>
                            ) : null
                        }
                    </div>
                </div>
            </div>
        )
    }
}