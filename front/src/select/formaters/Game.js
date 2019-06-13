import React from 'react';

export const Game = (game) => {
    return (
        <div className="search-item-user">
            <div className="d-flex">
                <div className="user-ava">
                    <img src={game.ava} />
                </div>
                <div className="user-info">
                    <div className="user-name">
                        {game.full_name}
                    </div>
                    <div className="user-username">
                        {game.username}
                    </div>
                </div>
            </div>
        </div>
    )
}
