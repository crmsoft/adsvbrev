import React, {Component, Fragment} from 'react';
import Input from './Input';
import {
    MESSAGE_RECEIVED,
    m_notified,
    close_chat
} from '../redux/events';
import axios from 'axios';
import { connect } from 'react-redux';
import MessageList from './MessageList';
import Header from './DialogHead';
import ScrollToBottom, {StateContext} from 'react-scroll-to-bottom';
import socketStore from '../../socket/redux/store';
import {SEND_MESSAGE} from '../../socket/redux/events';
import {inViewPort} from '../../utils';

class DialogComponent extends Component{

    state = {
        messagesList: [],
        reload: false,
        pullingPrev: false
    }

    constructor(props)
    {
        super(props)
        this.containerRef = React.createRef();
    }

    componentDidMount()
    {                
        this.pull()
        .then((items, chat) => {
            this.setState(state => {
                return {
                    chat: chat,
                    messagesList: [
                        ...state.messagesList,
                        ...items
                    ]
                }
            }, () => {
                this.containerRef.current.parentNode.addEventListener('scroll', this.containerScrollListener.bind(this), true);
            });
        });
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
            (this.state.messagesList.length === 0))
        {
            return false;
        }

        this.setState(state => {
            return {
                pullingPrev: true,
            }
        }, () => {
            const {hash_id} = this.props.chat;
            axios.post(`/chat/${hash_id}/pull/prev`, {
                last: this.state.messagesList[0].id
            })
            .then(({data}) => this.setState(state => {

                const parent = this.containerRef.current.parentNode;
                const child = Array.prototype.slice.call(
                                    parent.querySelectorAll('div.chat-message')
                                );
                return {
                    beforePull: child.length,
                    pullingPrev: !data.more,
                    messagesList: [
                        ...data.data.reverse(),
                        ...state.messagesList
                    ]
                }
            }, () => {
                const parent = this.containerRef.current.parentNode;
                const child = Array.prototype.slice.call(
                                    parent.querySelectorAll('div.chat-message')
                                ).reverse();
                
                child[this.state.beforePull] && child[this.state.beforePull].scrollIntoView();
            }))
        });
    }

    pull()
    {
        return new Promise((resolve, reject) => {
            //this.props.sended();
            const {hash_id} = this.props.chat;
            axios.post(`/chat/${hash_id}/pull`)
            .then(response => {
                const {data} = response.data;
                const ids = this.state.messagesList.map(m => m.id);
                resolve(
                    data.reverse().filter(m => {
                        return ids.indexOf(m.id) === -1
                    }), hash_id
                );
            });
        });
    }

    onMessage(message, attachment)
    {
        const hash = this.props.chat.hash_id;
        const frm = new FormData();

        frm.append(`message`, message);
        
        if (attachment)
        {
            frm.append(`file`, attachment);
        } // end if

        axios.post(`/chat/${hash}/message`, frm)
        .then(({data}) => {            
            this.setState({
                reload: false,
                messagesList: [
                    ...this.state.messagesList,
                    data.data                   
                ]
            }, () => socketStore.dispatch({type: SEND_MESSAGE, data: hash}))
        }).catch(err => {
            console.log(err);
            alert(`Failed to send message.`)
        });   
    }

    closeChat()
    {
        this.props.close( this.props.chat.hash_id ); 
    }

    componentDidUpdate()
    {
        if(this.state.reload)
        {
            this.pull()
            .then(items => {
                this.setState({
                    reload: false,
                    messagesList: [
                        ...this.state.messagesList,
                        ...items                   
                    ]
                });
            });
        }
    }

    componentWillUnmount()
    {
        this.containerRef.current.parentNode.removeEventListener('scroll', this.containerScrollListener);
    }

    static getDerivedStateFromProps(nextProps, prevState){

        if(nextProps.pullChat === nextProps.chat.hash_id)
        {            
            return {reload: true, readed: nextProps.chat.readed};
        }
       
        let messagesList = prevState.messagesList;

        if (nextProps.chat.readed && (
            nextProps.chat.readed !== prevState.readed
        ))
        {
            
            messagesList = messagesList.map(message => {
                if (!message.readed && (message.user.username === nextProps.messenger.username))
                {
                    message.readed = true;
                } // end if
                return message;
            })            
        } // end if
       
        return {
            reload: false, 
            messagesList: messagesList,
            readed: nextProps.chat.readed
        };
    }

    render(){   
        const {chat} = this.props;
        return (
            <div className="dialog">
                <Header members={chat.members} 
                        closeChat={this.closeChat.bind(this)}
                        me={this.props.messenger.username}
                        chat={chat}
                />
                <ScrollToBottom 
                    animating={false}
                    className="message-container"
                    followButtonClassName="message-list-show-last"
                >
                    <StateContext.Consumer>
                        {
                            () => (
                                <div ref={this.containerRef} className="messages-wrapper">
                                    <MessageList 
                                        me={this.props.messenger.username}
                                        messages={this.state.messagesList} 
                                    />
                                </div>
                            )
                        }
                    </StateContext.Consumer>
                </ScrollToBottom>
                <Input 
                    members={chat.members}
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
            sended: hash => dispatch(m_notified(hash)),
            close: hash => dispatch(close_chat(hash))
        }
    }
)(DialogComponent);

export default Dialog;