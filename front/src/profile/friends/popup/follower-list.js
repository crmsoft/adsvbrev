import React, { Component } from 'react';
import FollowerListItem from './follower-list-item';
import { connect, Provider } from 'react-redux';
import {intialFetch} from '../actions';
import { acceptToFriends } from '../../../friedship/event';

class FollowerListComponent extends Component{

    componentDidMount(){
        this.props.doFetch(this.props.user);
    }

    componentDidUpdate(){
        if(this.props.update){
            this.props.doFetch(this.props.user);
        }
    }

    render(){
        
        return (
            <div>
            {
                this.props.items.map( item => {
                    return <FollowerListItem 
                                isGuest={this.props.isGuest}
                                accept={this.props.accept}
                                key={item.username} 
                                userData={item} />
                })
            }
            </div>
        )
    }
}

const FollowerList = connect(
    state => {
        return {
            ...state
        };
    },
    dispatch => {
        return {
            doFetch: user => dispatch(intialFetch(user,true)),
            accept: username => dispatch(acceptToFriends(username))
        }
    }
)(
    FollowerListComponent
)

export default FollowerList;