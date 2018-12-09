import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class FollowerListItem extends Component{
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
                    <button>Write a message</button>
                    {
                        this.props.isGuest ? null : (
                            <button className="dd-btn btn-sm" 
                            onClick={() => this.props.accept(userData.username)}>Accept</button>
                        )
                    }
                </div>
            </div>
        )
    }
}

export default FollowerListItem;