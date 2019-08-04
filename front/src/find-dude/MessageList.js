import React, {PureComponent} from 'react';
import ScrollToBottom, {StateContext} from 'react-scroll-to-bottom';
import axios from 'axios';

import Message from '../chat/Dialog/Message';


export default class MessageList extends PureComponent {

    state = {
        items: [],
        game: null
    }

    static getDerivedStateFromProps(props, state) {
        
        const {push, game} = props;
        const {items} = state;

        // append message to list
        if (push && !items.filter(m => m.id === push.id).length) {
            return {
                items: [...items, push],
                game: game
            }
        } // end if

        return {
            game: game
        };
    }

    componentDidUpdate(props, state) {
        const {game} = this.state;
        
        // init chat
        if (game && (game !== state.game)) {
            axios.get(`/find-dudes/messages/${game}`)
            .then(({data}) => this.setState(({items: data.data})))
        } // end if
    }

    render() {

        const {items} = this.state;

        return (
            <ScrollToBottom 
                animating={false}
                className="message-list"
                followButtonClassName="message-list-show-last"
            >
            {
                items.map(message => (
                    <Message
                        author={false}
                        key={message.id}
                        showUser={true}
                        message={message}
                    />
                ))
            }
            </ScrollToBottom>
        )
    }
}