import React,{Component} from 'react';
import {DateTime} from 'luxon';

import { placeEmoji, urlify } from '../../utils';
import ImageZoom from '../../general/ImageZoom';

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

    userMarker(txt, _result) {
        let result = _result ? _result : [txt];
        const {markers} = this.state.message;

        for(let j = result.length; j>=0; j--) {
            
            const token = result[j];
            if (typeof token !== 'string') { continue; }

            for (let i = markers.length - 1; i >= 0; i--) {
                const mark = markers[i];
                const start_at = token.indexOf(mark);
                const ends_at = start_at + mark.length + 1;
                const rjxMark = <span key={`${ends_at}_${mark}`} className="btn-link">{`${mark} `}</span>;

                if (start_at !== -1) {
                    result[j] = undefined;
                    if (start_at !== 0){                        
                        result.push(
                            token.substring(0, start_at)
                        )
                    } // end if

                    result.push(
                        rjxMark            
                    );

                    (ends_at !== token.length) && result.push(
                        token.substring(ends_at, token.length)            
                    );
                    
                    return this.userMarker(null, result);
                } // end if

            } // end for
        } // end for


        return result;
    }

    render(){
        const {message} = this.state;
        const {showUser} = this.state;
        const {author} = this.state;
        
        const message_content = placeEmoji(message.message).map(c => {
            return (typeof c === 'string') ? urlify(c).map(txt => this.userMarker(txt)) : c;
        });

        return (
            <div className="chat-message">
                { showUser ? <MessageUserAva key={message.id} data={message} /> : <div style={{width:34}}></div> }
                <div className="message">
                    { showUser ? <MessageUserInfo key={message.id} data={message} /> : null }
                    <div className="message-content">
                        <div className="message-media">
                            {
                                message.media.map((image, index) => {
                                    return <ImageZoom key={index} src={image.full_path} thumb={image.thumb}  />
                                })
                            }
                        </div>
                        <div className="message-footer">
                            <span key={'message-text'} className="message-text">
                                {message_content}
                            </span>
                            {
                                author ? (
                                    message.readed ? (
                                        <span key={'message-read'} className="message-status readed"></span>
                                    ) : <span key={'message-not-read'} className="message-status"></span>
                                ) : null
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}