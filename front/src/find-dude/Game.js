import React, {useCallback} from 'react';

import {DudeContext} from './index';

export default ({
    game,
    index
}) => {

    return <DudeContext.Consumer>
        {
            ({
                activeIndex,
                setActive
            }) => (
                <div onClick={e => setActive(index)} className={activeIndex === index ? 'my-games-box active':'my-games-box'}>
                    <img src={game.ava} alt="" />
                    <div className="my-games-content">
                        <h3>{game.full_name}</h3>
                        <div className="my-games-desc">
                            <small>{game.participant_count}</small>
                            <p>Gamers Inside</p>
                        </div>
                    </div>
                </div>
            )
        }
    </DudeContext.Consumer>
}