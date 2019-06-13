import React, { Component } from 'react';
import { connect, Provider } from 'react-redux';
import { intialFetch, moreFetch } from '../actions';
import FriendListItem from './friend-list-item';
import { unfriend } from '../../../friendship/event';

class FriendsListComponent extends Component {

    componentDidMount(){
        this.props.init(this.props.user);
    }

    render(){
        return (
            <div className="user-friend-list">
                {
                    this.props.items.map( item => {
                        return (
                            <FriendListItem 
                                isGuest={this.props.isGuest}
                                unfriend={this.props.unfriend}
                                key={item.username} 
                                userData={item} 
                            />
                        )
                    })
                }
            </div>
        )
    }
}

const FriendsList = connect(
    state => {
        return {
            ...state
        }
    },
    dispatch => {
        return {
            init: user => { dispatch(intialFetch( user )); },
            more: () => { dispatch(moreFetch()); },
            unfriend: username => { dispatch(unfriend(username)); }
        }
    }
)(
    FriendsListComponent
);

export default FriendsList;