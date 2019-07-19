import React, {useState} from 'react';
import {connect} from 'react-redux';

import {
    join
} from '../../event/redux/event';

const EventComponent = ({
    not, index, join, id, user_participant
}) => {      
    const [participant, setParticipant] = useState(not.data.participant || ((id === not.data.id) && user_participant));
    
    return (
        <li className={`user ${not.type}`} key={index}>
            <div className={not.viewed ? 'row' : 'row unread'}>
                <div className="col-auto align-self-center p-0">
                    <div className="notification-info text-center">
                        <div className={`icon-${not.type}`}></div>
                        <span className="notification-time">{not.time}</span>
                    </div>  
                </div>
                <div className="col p-0">
                    <a className="user-list-item d-inline-flex">
                        <div className="ava-wrapper">
                            <div className="status offline"></div>
                            <div className="user-list-ava">
                                <img src={not.user.ava} />
                            </div>
                        </div>
                        <div className="user-list-user">
                            <span className='user-list-username'>
                                {not.message} 
                                &nbsp;
                                <span className={participant ? 'd-none' : ''}>
                                    <span 
                                        className="btn-link"
                                        onClick={e => !setParticipant(true) && join(not.data.id, 'interested', (id !== not.data.id))}    
                                    >{`Interested`}</span>/
                                    <span 
                                        className="btn-link"
                                        onClick={e => !setParticipant(true) && join(not.data.id, undefined, (id !== not.data.id))}    
                                    >{`Attending`}</span>
                                </span>
                            </span>
                        </div>
                    </a>
                </div>
            </div>
        </li>
    )
}

export default connect(
    state => {
        return {
            ...state
        }
    },
    dispatch => {
        return {
            join: (event, type, dsp) => dispatch(join(event,type, dsp)),
        }
    }
)(EventComponent)