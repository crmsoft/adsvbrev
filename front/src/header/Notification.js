import React,{Component, Fragment} from 'react';
import {Link} from 'react-router-dom';
import Popup from 'reactjs-popup';
import axios from 'axios';

export default class Notification extends Component{

    state = {
        list: [],
        open: false
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