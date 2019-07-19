import React, {useState} from 'react';
import axios from 'axios';

const Suggested = ({
    user,
    onInvite
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
        {
            user.invited ? null : (
                <div 
                    onClick={e => onInvite(user.username)}
                    className="suggested-friend-button">
                    invite&nbsp;>
                </div>
            )
        }
    </div>
)

export default function ({
    list,
    event
}){
    const [users, setUser] = useState(list);

    const onInvite = username => {
        setUser(
            users.map(user => {
                user.invited = user.invited || (username === user.username);
                return user;
            })
        );

        axios.post(`/event/${event}/invite`, {
            username: username
        });
    }

    return (
        <div className="event-suggested-friend">
            <div className="event-suggested-friend-header">
                Suggested Friends
            </div>
            <div className="event-suggested-friend-content">
                {users.map(user => <Suggested key={user.username} onInvite={onInvite} user={user} />)}
            </div>
            <div className="event-suggested-all">
                <a className={users.length === 3 ? '' : 'd-none'} href="#">All Friends</a>
            </div>
        </div>
    )
}