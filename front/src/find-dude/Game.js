import React from 'react';

import {DudeContext} from './index';

export default ({
    game,
    index
}) => {

    return <DudeContext.Consumer>
        {
            ({
                activeIndex,
                openRooms,
                setActive
            }) => (
                <div className="my-games-wrapper">
                    <div onClick={e => setActive(index)} className={activeIndex === index ? 'my-games-box active':'my-games-box'}>
                        <img src={game.ava} alt="" />
                        <div className="my-games-content">
                            <h3>{game.name}</h3>
                            <div className="my-games-desc">
                                <small>{game.participant_count}</small>
                                <p>Gamers Inside</p>
                            </div>
                        </div>
                    </div>
                    <div className="sub-channels-total">
                        <div className="row">
                            <div className="col-auto p-0 pl-2 mt-1">
                                <div className="sub-channel-arrow"></div>
                            </div>
                            <div 
                                onClick={e => openRooms(true)}
                                className="col p-0 pt-2 pl-2 sub-channels-btn">
                                {
                                    game.total_sub_channel
                                    ? `#${game.total_sub_channel} ` + (game.total_sub_channel == 1 ? `Room`:`Open Rooms`)    
                                    : `+ Create Room`
                                } 
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    </DudeContext.Consumer>
}