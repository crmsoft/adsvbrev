import React, {Component, Fragment} from 'react';
import Message from './Message';
import {DateDelimiter} from './DateDelimiter';
import {DateTime} from 'luxon';

/**
 * helper to show message user once 
 */
export const getStore = () => {
    
    let data = {
        isChanged: true,
        currentUser: null,
        time: DateTime.fromISO('1990-01-01')
    };


    return function(username, t) {        

        let next_time = DateTime.fromMillis(t * 1000);
        let diff = next_time.diff(this.time, ['seconds', 'days']).toObject();
        
        this.isChanged = (this.currentUser !== username) || (
            diff.seconds > 600
        );
        this.currentUser = username;
        this.time = next_time;
        
        return {
            user: this.isChanged,
            day:  diff.days >= 1 ? next_time : false
        }
    }.bind(data)
}

export default class MessageList extends Component {

    state = {
        localeStore: null
    }

    static getDerivedStateFromProps(nextProps, state)
    {
        return {
            localeStore: getStore()
        }
    }

    render()
    {
        return (
            <Fragment>
                {
                    this.props.messages.map(message => {
                        
                        const {user} = message;
                        
                        const diff = this.state.localeStore(user.username, message.created_at);
                        const UserMessage = <Message 
                                                author={message.user.username === this.props.me}
                                                key={message.id}
                                                showUser={diff.user}
                                                message={message}
                                            /> 

                        return diff.day ? [
                            <DateDelimiter key={diff.day} date={diff.day} />, UserMessage
                        ] : UserMessage
                    })
                }
            </Fragment>
        )
    }
}