import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

export default class UserListComponent extends Component {
    constructor(props){
        super(props);
        this.state = {
            user: this.props.data
        }
    }

    addToFriends(username){
        axios.post(`/friends/add/${username}`)
        .then(response => this.setState({ user: {...this.state.user,has_status:response.data.status} }))
        .catch(err => console.log(err))
    }

    unsubscribe(username){
        axios.post(`/friends/unsubscribe/${username}`)
        .then(response => this.setState({ user: {...this.state.user,has_status:response.data.status} }))
        .catch(err => console.log(err))
    }

    acceptToFriends(username){
        axios.post(`/friends/accept/${username}`)
        .then(response => this.setState({ user: {...this.state.user,has_status:response.data.status} }))
        .catch(err => console.log(err))
    }

    unfriend(username){
        axios.post(`/friends/unfriend/${username}`)
        .then(response => this.setState({ user: {...this.state.user,has_status:response.data.status} }))
        .catch(err => console.log(err))
    }

    componentWillReceiveProps(props){
        this.setState({
            user: props.data
        })
    }

    render(){
        const {user} = this.state;

        if (!user)
        {
            return null;
        }

        return (
            <div className="search-item-user mr-2 mt-2">
                <Link to={`/gg/${user.username}`} className="d-flex">
                    <div className="user-ava">
                        <img src={user.ava} />
                    </div>
                    <div className="user-info">
                        <div className="user-name">
                            {user.full_name}
                        </div>
                        <div className="user-username">
                            {user.username}
                        </div>
                    </div>
                </Link>
                <div>
                    {
                        user.has_status === 'none' ? 
                            (<button 
                                className="dd-btn btn-sm mt-2"
                                onClick={event => {this.addToFriends.call(this,user.username)}}
                            > <span className="icon-add-dude"></span> Add to friends </button>) : ''
                    }
                    {
                        user.has_status === 'subscribed' ? 
                            (<button 
                                className="dd-btn btn-sm btn-gray mt-2"
                                onClick={event => {this.unsubscribe.call(this,user.username)}}
                            > <span className="icon-remove"></span> Unsubscribe </button>) : ''
                    }
                    {
                        user.has_status === 'following' ? 
                            (<button 
                                className="dd-btn btn-sm mt-2"
                                onClick={event => {this.acceptToFriends.call(this,user.username)}}
                            > <span className="icon-accept-friendship"></span> Accept </button>) : ''
                    }
                    {
                        user.has_status === 'friends' ? 
                            (<button 
                                className="dd-btn btn-sm btn-gray mt-2"
                                onClick={event => {this.unfriend.call(this,user.username)}}
                            > <span className="icon-remove"></span> Unfriend </button>) : ''
                    }
                </div>
            </div>
        )
    }
}