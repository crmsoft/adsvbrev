import React, {Component} from 'react';
import Input from './Input';
import {
    MESSAGE_RECIEVED,
    m_notified,
    close_chat
} from '../redux/events';
import axios from 'axios';
import { connect } from 'react-redux';
import MessageList from './MessageList';
import Header from './DialogHead';
import ScrollToBottom from 'react-scroll-to-bottom';
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
        .then(done => {
            this.containerRef.current.addEventListener('scroll', this.containerScrollListener.bind(this), true);
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

                const parent = this.containerRef.current.querySelector('.css-y1c0xs');
                const childs = Array.prototype.slice.call(
                                    parent.querySelectorAll('div.message')
                                );
                for(var l = childs.length, i = 0; i<l; i++)
                {
                    if(inViewPort(childs[i], parent))
                    {
                        break;
                    }
                } // end for
                
                return {
                    beforePull: childs[i],
                    pullingPrev: !data.more,
                    messagesList: [
                        ...data.data.reverse(),
                        ...state.messagesList
                    ]
                }
            }, () => {
                this.state.beforePull && this.state.beforePull.scrollIntoView();
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
                this.setState(state => {
                    const ids = state.messagesList.map(m => m.id);
                    return {
                        chat: hash_id,
                        messagesList: [
                            ...state.messagesList,
                            ...data.reverse().filter(m => {
                                return ids.indexOf(m.id) === -1
                            })
                        ]
                    }
                });
                return true;
            })
            .then(done => setTimeout(resolve, 450))
        });
    }

    onMessage(message)
    {
        const hash = this.props.chat.hash_id;
        axios.post(`/chat/${hash}/message`, {
            message: message
        }).then(({data}) => {            
            this.setState({
                reload: false,
                messagesList: [
                    ...this.state.messagesList,
                    data.data                   
                ]
            }, () => socketStore.dispatch({type: SEND_MESSAGE, data: hash}))
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
            this.pull();
        }
    }

    componentWillUnmount()
    {
        this.containerRef.current.removeEventListener('scroll', this.containerScrollListener);
    }

    static getDerivedStateFromProps(nextProps, prevState){

        if(nextProps.pullChat === nextProps.chat.hash_id)
        {            
            return {reload: true};
        }
       
       
        return {reload: false};
    }

    render(){   
            
        return (
            <div className="dialog" ref={this.containerRef}>
                <Header members={this.props.chat.members} 
                        closeChat={this.closeChat.bind(this)}
                        me={this.props.messenger.username}
                />
                <ScrollToBottom 
                    animating={false}
                    className="message-container"
                >
                <MessageList messages={this.state.messagesList} />
                </ScrollToBottom>
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
            sended: hash => dispatch(m_notified(hash)),
            close: hash => dispatch(close_chat(hash))
        }
    }
)(DialogComponent);

export default Dialog;