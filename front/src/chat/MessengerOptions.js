import React, {Component} from 'react';
import store from './redux/store';
import {
    STATUS_BUSY,
    STATUS_OFFLINE,
    STATUS_ONLINE,
    SOUND_OFF,
    SOUND_ON
} from './redux/events';
import axios from 'axios';

export default class MessengerOptions extends Component{

    constructor(props)
    {
        super(props);
        this.state = {
            sound: this.props.sound,
            status: this.props.status
        }
    }

    onStatusChange(status)
    {
        store.dispatch({type: status, data: null});
    }

    onSound()
    {
        store.dispatch({type: this.state.sound === 'on' ? SOUND_OFF : SOUND_ON, data: null})
    }

    static getDerivedStateFromProps(nextProps, prevState){

        if(nextProps.sound !== prevState.sound)
        {
            axios.post(`/messenger/sound`, {
                sound: nextProps.sound
            });

            return {
                sound: nextProps.sound
            }
        }

        if(nextProps.status !== prevState.status)
        {
            const {status} = nextProps;

            axios.post(`/messenger/status`, {
                status: status
            });

            return {
                status: status
            }
        }
       
       
        return null;
    }

    render()
    {
        const {status, sound} = this.state;

        return (
            <div className="messenger-options">
                <div className="main-title">
                    Messenger Settings    
                </div>           
                <div className="messenger-sound-option">
                    <div className="sound-title">
                        Sound
                    </div>
                    <div className="sound-option-switch">
                        <label className="switch">
                            <input 
                                checked={sound === 'on'}
                                type="checkbox" 
                                onChange={this.onSound.bind(this)} 
                            />
                            <span className="slider round"></span>
                        </label>
                    </div>
                </div>
                <div className="messenger-options-statuses">
                    <div className="status-title">
                        Status
                    </div>
                    <div 
                        className={"status offline " + (status === 'offline' ? 'active':'')}
                        onClick={() => this.onStatusChange.call(this, STATUS_OFFLINE)}
                    >
                        Offline
                    </div>
                    <div 
                        className={"status busy " + (status === 'busy' ? 'active':'')}
                        onClick={() => this.onStatusChange.call(this, STATUS_BUSY)}
                    >
                        Busy
                    </div>
                    <div 
                        className={"status online " + (status === 'online' ? 'active':'')}
                        onClick={() => this.onStatusChange.call(this, STATUS_ONLINE)}
                    >
                        Online
                    </div>
                </div>
                <div className="text-right pt-3">
                    <button 
                        onClick={this.props.onCreateGroup}
                        className="dd-btn btn-sm btn-gray">
                        Create group
                    </button>
                </div>
            </div>
        )
    }
}