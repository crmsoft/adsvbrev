import React,{Component, Fragment} from 'react';
import {Provider} from 'react-redux';

import store from '../event/redux/store';
import {Link} from 'react-router-dom';
import Popup from 'reactjs-popup';
import axios from 'axios';
import socketStore from '../socket/redux/store';
import {
    NOTIFICATION
} from '../socket/redux/events';
import NewNotification from '../chat/sounds/NewNotification';
import Event from './notifications/Event';

export default class Notification extends Component{

    state = {
        list: [],
        open: false
    }

    componentDidMount()
    {
        this.socketSubscription = socketStore.subscribe(() => {
            const state = socketStore.getState();

            if (state.recieved === NOTIFICATION)
            {
                NewNotification.play();
                this.props.onNotificationReceived();   
            } // end if

        });
    }

    componentWillUnmount()
    {
        if (this.socketSubscription)
        {
            this.socketSubscription();
        } // end if
    }

    loadNotifications()
    {
        axios.get(`/notification/list`)
        .then(response => this.setState(() => { 
            return { 
                list: response.data.data 
            } 
        }, () => {
            this.props.clear()
        }))
    }

    onClose()
    {
        this.setState(() => {
            return {
                open: false
            }
        })
    }

    render()
    {
        const {list} = this.state;
        return (
            <div className="followers-popup">
                <Popup
                    onOpen={e => this.loadNotifications()}
                    modal={false}
                    overlayStyle={{display:'none'}}
                    position="bottom center"
                    trigger={this.props.trigger}
                >
                    <Fragment>
                        <div className="followers-header">
                            Notifications
                        </div>
                        <ul className="notification-list">
                            {
                                list.map((not, index) => {
                                    return (not.type === 'liked' || not.type === 'comment' || not.type === 'shared') ? (
                                        <TypeSharedComment key={index} index={index} not={not}/>
                                    ) : (
                                        <Provider key={index} store={store}>
                                            <Event index={index} not={not} />
                                        </Provider>
                                    )
                                })
                            }
                        </ul>
                    </Fragment>
                </Popup>
            </div>
        )
    }
}

const TypeSharedComment = ({
    not, index
}) => (
    <li className={`user ${not.type}`} key={index}>
        <div className={not.viewed ? 'row' : 'row unread'}>
            <div className="col-auto align-self-center p-0">
                <div className="notification-info text-center">
                    <div className={`icon-${not.type}`}></div>
                    <span className="notification-time">{not.time}</span>
                </div>  
            </div>
            <div className="col p-0">
                <Link to={`#p=${not.target}`} className="user-list-item d-inline-flex">
                    <div className="ava-wrapper">
                        <div className="status offline"></div>
                        <div className="user-list-ava">
                            <img src={not.user.ava} />
                        </div>
                    </div>
                    <div className="user-list-user">
                        <span className="user-list-user-name">{not.title}</span>
                        <span className="user-list-username">
                            {not.message}
                        </span>
                    </div>
                </Link>
            </div>
        </div>
    </li>
)