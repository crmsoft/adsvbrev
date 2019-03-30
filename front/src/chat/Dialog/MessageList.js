import React, {Component, Fragment} from 'react';
import Message from './Message';

/**
 * helper to show message user once 
 */
const getStore = () => {
    
    let data = {
        isChanged: true,
        currentUser: null
    };

    return function(username) {
        this.isChanged = this.currentUser !== username;
        this.currentUser = username;
        return this.isChanged;
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
                        
                        return <Message 
                                    author={message.user.username === this.props.me}
                                    key={message.id}
                                    showUser={this.state.localeStore(user.username)}
                                    message={message}
                                />
                    })
                }
            </Fragment>
        )
    }
}