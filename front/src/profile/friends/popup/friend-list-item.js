import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {
    unfriend
} from '../../../friendship/event';

class FriendListItemComponent extends Component{
    render(){
        const {userData} = this.props;
        
        return (
            <div className="user-list-item">
                <Link to={`/gg/${userData.username}`} className="d-flex">
                    <div className="user-list-ava">
                        <img src={`${userData.ava}`}/>
                    </div>
                    <div className="user-list-user">
                        <span style={{fontWeight:'bold'}}>{userData.full_name}</span>
                        <span style={{fontSize:'14px'}}>{userData.username}</span>
                    </div>
                </Link>
                <div>
                    <button className="dd-btn btn-sm">Write a message</button>
                    {
                        !this.props.isGuest ? (
                            <button 
                                className="dd-btn btn-gray btn-sm"
                                onClick={() => this.props.remove(userData.username)}>Unfriend</button>
                        ) : null
                    }
                </div>
            </div>
        )
    }
}

const FriendListItem = connect(
    state => {
        return {
            ...state
        }
    },
    dispatch => {
        return {
            remove: username => dispatch(unfriend(username))
        }
    }
)(FriendListItemComponent);

export default FriendListItem;