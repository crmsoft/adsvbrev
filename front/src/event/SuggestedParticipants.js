import React from 'react';

const Suggested = ({
    user
}) => (
    <div className="event-suggested-friend-box">
        <div className="suggested-friend-img-content">
        <div className="suggested-friend-img">
            <img src={user.ava} alt={user.full_name} />
        </div>
        </div>
        <div className="suggested-friend-name">
            <small className="name">{user.first_name}</small>
            <small>{user.username}</small>
        </div>
        <div className="suggested-friend-button">
            invite&nbsp;>
        </div>
    </div>
)

export default function ({
    list
}){
    return (
        <div className="event-suggested-friend">
            <div className="event-suggested-friend-header">
                Suggested Friends
            </div>
            <div className="event-suggested-friend-content">
                {list.map(user => <Suggested user={user} />)}
            </div>
            <div className="event-suggested-all">
                <a href="#">All Friends</a>
            </div>
        </div>
    )
}