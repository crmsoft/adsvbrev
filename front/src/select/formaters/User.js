import React from 'react';

export const User = (user) => {
    return (
        <div className="search-item-user">
            <div className="d-flex">
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
            </div>
        </div>
    )
}
