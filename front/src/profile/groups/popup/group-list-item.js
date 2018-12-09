import React from 'react';
import {Link} from 'react-router-dom';

const GroupListItem = (props) => {
    return (
        <div className="user-list-item">
            <Link to={`/gg/${props.user.username}`} className="d-flex">
                <div className="user-list-ava">
                    <img src={`/${props.user.profile.list_photo}`}/>
                </div>
                <div className="user-list-user">
                    <span style={{fontWeight:'bold'}}>{props.user.full_name}</span>
                    <span style={{fontSize:'14px'}}>{props.user.username}</span>
                </div>
            </Link>
            <div>
                <button>Write a message</button>
                <button> ?</button>
            </div>
        </div>
    )
}

export default GroupListItem;