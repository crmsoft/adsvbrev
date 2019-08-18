import React, {useState} from 'react';

import { Loading } from '../../general/Loading';
import ChannelList from './ChannelList';
import {DudeContext} from '../index';
import CreateChannel from './CreateChannel';
import axios from 'axios';

const GameChannels = () => {
    return (
        <DudeContext.Consumer>
            {
                (props) => <GameChannelsComponent {...props} />
            }
        </DudeContext.Consumer>
    )
}

const GameChannelsComponent = ({
    activeGame,
    openRooms,
    loading,
    onRoomCreated
}) => {       
    const {channel} = activeGame;
    
    const [createOpen, setCreateOpen] = useState(false);
    const [errors, setErrors] = useState({});
    const [processing, setProcessing] = useState(false);

    const createChannelAction = (data) => {
        setProcessing(true);
        const frm = new FormData();
        for(var k in data) {
            frm.append(k, data[k]);
        }
        axios.post(`/find-dudes/sub-channels/${channel}/store`, frm)
        .then(({data}) => {
            setProcessing(false);
            setCreateOpen(false);
            onRoomCreated(data.data);
        })
        .catch(({response}) => {
            if(response.status == 422){
                setProcessing(false);
                setErrors(response.data.errors)
            } // end if
        })
    }

    return (
        <div className="my-games" >
            <CreateChannel 
                processing={processing}
                errors={errors}
                open={createOpen}
                onClose={e => setCreateOpen(false)}
                onSubmit={createChannelAction}
            />
            <div className="my-games-title">
                <div className="row sub-channel-title">
                    <div className="col-auto pr-0">
                        <span onClick={e => openRooms(false)} className="icon icon-arrow-down"></span>
                    </div>
                    <div className="col pl-0">
                        <span className="title">
                            Rooms
                        </span>
                        <small className='selected-game'>
                            {activeGame.name}
                        </small>
                    </div>
                    <div 
                        onClick={e => setCreateOpen(true)}
                        className="col-auto">
                        <span className="icon icon-plus"></span>
                    </div>
                </div>
            </div>
            
            {
                loading ? <Loading /> : <ChannelList />
            }

            <div className="my-games-bottom">
            <div className="my-games-notifications">
                <p>* You can only access
                    the rooms of your chosen
                    games. <b> Click </b>to select a game!</p>
            </div>

            <div className="my-games-search">
                <div className="input-group flex-nowrap">
                    <div className="input-group-prepend">
                        <span className="input-group-text" id="addon-wrapping"><i className="fa fa-search"></i></span>
                    </div>
                    <input type="text" className="form-control" placeholder="Search game" aria-label="Search My games" aria-describedby="addon-wrapping" />
                </div>
            </div>
            </div>
        </div>
    )
}

export default GameChannels;
