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
        return (
            <div className="search-item-user">
                <Link to={`/gg/${user.username}`} className="d-flex">
                    <div className="user-ava">
                        <img src={user.ava} />
                    </div>
                    <div>
                        <div>
                            {user.full_name}
                        </div>
                        <div>
                            {user.username}
                        </div>
                    </div>
                </Link>
                <div>
                    {
                        user.has_status === 'none' ? 
                            (<button 
                                onClick={event => {this.addToFriends.call(this,user.username)}}
                            > Add to friends </button>) : ''
                    }
                    {
                        user.has_status === 'subscribed' ? 
                            (<button 
                                onClick={event => {this.unsubscribe.call(this,user.username)}}
                            > Unsubscribe </button>) : ''
                    }
                    {
                        user.has_status === 'following' ? 
                            (<button 
                                onClick={event => {this.acceptToFriends.call(this,user.username)}}
                            > Accept </button>) : ''
                    }
                    {
                        user.has_status === 'friends' ? 
                            (<button 
                                className="dd-btn btn-sm btn-gray"
                                onClick={event => {this.unfriend.call(this,user.username)}}
                            > Unfriend </button>) : ''
                    }
                    <button>Write a message</button>
                </div>
            </div>
        )
    }
}