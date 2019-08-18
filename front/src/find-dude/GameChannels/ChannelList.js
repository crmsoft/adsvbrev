import React from 'react';
import { DudeContext } from '..';


const Channel = ({
    channel,
    index,
    setActiveRoom,
    active_index
}) => {

    let cls = 'game-channel';

    if (channel.full) {
        cls += ' full';
    } // end if

    if (index === active_index) {
        cls += ' active';
    } // end if

    return (
        <div 
            onClick={e => setActiveRoom(index)}
            className={cls}>
            <div className="channel-name">
                # {channel.channel}
            </div>
            <span className="channel-users">
                {channel.users_in} dude on channel
            </span>
            <span className="channel-full icon-remove" title="The room is full."></span>
        </div>
    )
}

export default () => {

    return (
        <DudeContext.Consumer>
            {
                ({
                    setActiveRoom,
                    subChannels,
                    active_room_index
                }) => (
                    <div className="game-channel-list">
                        {
                            subChannels.map((channel, index) => <Channel 
                                                                    setActiveRoom={setActiveRoom}
                                                                    index={index} 
                                                                    active_index={active_room_index}
                                                                    key={channel.channel} 
                                                                    channel={channel} 
                                                                    />)
                        }
                    </div>
                )
            }
        </DudeContext.Consumer>
    )
}