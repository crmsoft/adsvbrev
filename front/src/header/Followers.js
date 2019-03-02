import React, {Component, Fragment} from 'react';
import {Link} from 'react-router-dom';
import Popup from 'reactjs-popup';
import axios from 'axios';

export default class Followers extends Component{

    state = {
        list: [],
        open: false
    }

    componentDidUpdate()
    {
        if (this.state.load)
        {
            axios.get(`/followers/list`)
            .then(response => this.setState(() => { return { load: false, list: response.data.data } }))
        } // end if
    }

    onAccept(username)
    {
        this.setState(state => {
            return {
                list: state.list.filter(user => {
                    return user.username !== username
                }),
                load: false
            }
        }, () => {
            this.props.onAccept(username);
        });
    }

    onDecline(username)
    {
        this.setState(state => {
            return {
                list: state.list.filter(user => {
                    return user.username !== username
                }),
                load: false
            }
        }, () => {
            this.props.onDecline(username);
        });
    }
    
    onClose()
    {
        this.setState(() => {
            return {
                open: false
            }
        })
    }

    loadList()
    {
        this.setState(() => {
            return {
                load: true
            }
        });
    }

    render()
    {
        const {list} = this.state;
        
        if (list.length === 0)
        {
            return (
                <div className="followers-popup">
                    <Popup
                        onOpen={this.loadList.bind(this)}
                        modal={false}
                        overlayStyle={{display:'none'}}
                        position="bottom right"
                        trigger={this.props.trigger}
                    >
                        <Fragment>
                            <div className="followers-header">
                                <span className="icon icon-friend"></span> Friend Request
                            </div>
                            <div className={`followers-list text-center main-color p-3`}>Empty</div>
                        </Fragment>
                    </Popup>
                </div>
            )
        }

        return (
            <div className="followers-popup">
                <Popup
                    onOpen={e => this.props.onOpen()}
                    open={this.props.open}
                    onClose={e => this.props.close()}
                    modal={false}
                    overlayStyle={{display:'none'}}
                    position="bottom right"
                    trigger={this.props.trigger}
                >
                    <Fragment>
                        <div className="followers-header">
                            <span className="icon icon-friend"></span> Friend Request
                        </div>
                        <ul className="followers-list">
                        {
                            list.map(user => {
                                return (
                                    <li className="user" key={user.username}>
                                        <div className="row">
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
                                                            {user.mutual === 0 ? 'no mutual friends' : `${user.mutual} mutual friend`}
                                                        </span>
                                                    </div>
                                                </Link>
                                            </div>
                                            <div className="actions">
                                                <button 
                                                    onClick={e => this.onAccept.call(this,user.username)}
                                                    className="dd-btn btn-yellow btn-sm m-1"
                                                >Accept</button>
                                                <button 
                                                    onClick={e => this.onDecline.call(this, user.username)}
                                                    className="dd-btn btn-red btn-sm m-1">Deny</button>
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