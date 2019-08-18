import React from 'react';

export const User = ({
    user
}) => {
    return (
        <div className="user-list-item justify-content-start">
            <div className="d-flex">
                <div className="user-list-ava">
                    <img src={user.ava} />
                </div>
            </div>
            <div className="user-list-user">
                <span className="user-list-user-name">{user.full_name}</span>
                <span className="user-list-username">{user.username}</span>
            </div>
        </div>
    )
}