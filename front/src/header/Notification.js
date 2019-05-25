import React,{Component, Fragment} from 'react';
import {Link} from 'react-router-dom';
import Popup from 'reactjs-popup';
import axios from 'axios';
import socketStore from '../socket/redux/store';
import {
    NOTIFICATION
} from '../socket/redux/events';
import NewNotification from '../chat/sounds/NewNotification';

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
                this.props.onNotificatoinRecieved();   
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

    componentDidUpdate()
    {
        if (this.state.load)
        {
            axios.get(`/notification/list`)
            .then(response => this.setState(() => { 
                return { 
                    load: false, 
                    list: response.data.data 
                } 
            }, () => {
                this.props.clear()
            }))
        } // end if
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
                    onOpen={e => this.setState({load:true})}
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
                                    const user = not.user;
                                    return (
                                        <li className="user" key={index}>
                                            <div className={not.viewed ? 'row' : 'row unread'}>
                                                <div className="col-auto align-self-center p-0">
                                                    <div className="notification-info text-center">
                                                        <div className={`main-color icon-${not.type}`}></div>
                                                        <span className="notification-time">{not.time}</span>
                                                    </div>  
                                                </div>
                                                <div className="col p-0">
                                                    <Link to={`/gg/${user.username}`} className="user-list-item d-inline-flex">
                                                        <div className="ava-wrapper">
                                                            <div className="status offline"></div>
                                                            <div className="user-list-ava">
                                                                <img src={user.ava} />
                                                            </div>
                                                        </div>
                                                        <div className="user-list-user">
                                                            <span className="user-list-user-name">{user.full_name}</span>
                                                            <span className="user-list-username">
                                                                {not.message}
                                                            </span>
                                                        </div>
                                                    </Link>
                                                </div>
                                            </div>
                                        </li>
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