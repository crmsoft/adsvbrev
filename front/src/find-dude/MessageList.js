import React, {Component} from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';
import axios from 'axios';

import Message from '../chat/Dialog/Message';
import socketStore from '../socket/redux/store';
import { DUDE_CHANNEL_UPDATE } from '../socket/redux/events';
import {DateDelimiter} from '../chat/Dialog/DateDelimiter';
import {getStore} from '../chat/Dialog/MessageList';

export default class MessageList extends Component {

    state = {
        items: [],
        game: null,
        pullPrev: false,
        room: undefined
    }

    static getDerivedStateFromProps(props, state) {
        
        const {push, game, room} = props;
        const {items} = state;

        // append message to list
        if (push && !items.filter(m => m.id === push.id).length) {
            return {
                items: [...items, push],
                game: game,
                localeStore: getStore()
            }
        } // end if

        return {
            game: game,
            localeStore: getStore(),
            room: room
        };
    }

    componentDidMount() {
        this.socketStoreSubscription = socketStore.subscribe(() => {
            const state = socketStore.getState();
            const {game, room} = this.state;
            
            if (state.received === DUDE_CHANNEL_UPDATE) {

                let frm = null;

                if (room) {
                    frm = new FormData();
                    frm.append('room', room.id);
                } else if (game !== state.data) {
                    return;
                }

                this.loadLast(frm)
                .then(({data}) => {
                    const unreads = data.data.reverse();

                    this.setState(state => {
                        const {items} = state;
                        return {
                            items: [
                                ...items,
                                ...unreads.filter(message => {
                                    return items.filter(read => {
                                        return message.id === read.id
                                    }).length === 0
                                })
                            ]
                        }
                    })
                })
            } // end if
        });
    }

    componentDidUpdate(props, state) {
        const {game, room} = this.state;
        
        this.containerRef.parentNode.removeEventListener('scroll', this.containerScrollListener);
        // init chat
        if (game && (game !== state.game)) {
            const frm = new FormData();
            frm.append('page-id', socketStore.getState().token);
            this.loadLast(frm)
            .then(({data}) => this.setState(({items: data.data.reverse(), pullingPrev:false}), () => {
                this.containerRef.parentNode.addEventListener('scroll', this.containerScrollListener.bind(this), true);
            }))
        } else if (room && (!state.room || (room.id !== state.room.id))) {
            const frm = new FormData();
            frm.append('page-id', socketStore.getState().token);
            frm.append('room', room.id);
            this.loadLast(frm)
            .then(({data}) => this.setState(({items: data.data.reverse(), pullingPrev:false}), () => {
                this.containerRef.parentNode.addEventListener('scroll', this.containerScrollListener.bind(this), true);
            }))
        } // end if
    }

    loadLast(frm) {
        return axios.post(`/find-dudes/messages/${this.state.game}`, frm);
    }

    containerScrollListener(e)
    {
        const container = e.target;
        if( container.scrollTop < 10)
        {
            this.pullPrev();
        }
    }

    pullPrev()
    {
        
        if(this.state.pullingPrev || 
            (this.state.items.length === 0))
        {
            return false;
        }

        this.setState(state => {
            return {
                pullingPrev: true,
            }
        }, () => {
            const {game, items, room} = this.state;
            const frm = new FormData();
            frm.append('page-id', socketStore.getState().token);
            room && frm.append('room', room.id);

            axios.post(`/find-dudes/messages/${game}/${items[0].id}`, frm)
            .then(({data}) => this.setState(state => {

                const parent = this.containerRef.parentNode;
                const child = Array.prototype.slice.call(
                                    parent.querySelectorAll('div.chat-message')
                                );
                return {
                    beforePull: child.length,
                    pullingPrev: !data.more,
                    items: [
                        ...data.data.reverse(),
                        ...state.items
                    ]
                }
            }, () => {
                const parent = this.containerRef.parentNode;
                const child = Array.prototype.slice.call(
                                    parent.querySelectorAll('div.chat-message')
                                ).reverse();
                
                child[this.state.beforePull] && child[this.state.beforePull].scrollIntoView();
            }))
        });
    }

    componentWillUnmount()
    {
        this.containerRef.parentNode.removeEventListener('scroll', this.containerScrollListener);
        this.socketStoreSubscription && this.socketStoreSubscription();
    }

    render() {

        const {items} = this.state;

        return (
            <ScrollToBottom 
                animating={false}
                className="message-list"
                followButtonClassName="message-list-show-last"
            >
                <div ref={ref => {this.containerRef = ref;}}>
                {
                    items.map(message => {
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
                </div>
            </ScrollToBottom>
        )
    }
}
