import React, {useState} from 'react';
import {DateTime} from 'luxon';
import axios from 'axios';

import {Modal, actions} from '../Modal';
import Tooltip from '../Modal/Tooltip';
import Form from '../schedule/Form';

const Edit = ({
    edit,
    setEdit,
    onUpdate,
    data
}) => {

    const [formData,onFormData] = useState(new FormData());

    const update = () => {
        axios.post(`/event/update/${data.id}`, formData)
        .then(({data}) => {
            onUpdate();
            setEdit(false);
        })
    }

    return (
        <Modal
            title={`Edit Event`}
            open={edit}
            onClose={e => setEdit(false)}
            actions={actions(() => setEdit(false), update)}
        >
            <div className="schedule">
                <Form 
                    data={data}
                    errors={{}}
                    onForm={frm => onFormData(frm)}
                />
            </div>
        </Modal>
    )
}


export default ({
    data, 
    onUpdate, 
    onLeave, 
    onJoin,
    onInterested
}) => {
    
    const [edit,setEdit] = useState(false);

    return (
        <div className="event-schedule">
            
            <Edit onUpdate={onUpdate} edit={edit} setEdit={setEdit} data={data} />

            <button 
                onClick={e => setEdit(true)}
                className={data.is_owner ? 'edit':'d-none'}    
            >
                <span className="icon icon-cake"></span>
            </button>

            <div className="row">
                <div className="col-md-3">
                    <div className="event-schedule-left">
                        <h3>
                            {DateTime.fromISO(data.start).toLocaleString({month:'short'})}
                        </h3>
                        <div className="event-schedule-number">
                            {DateTime.fromISO(data.start).toLocaleString({day:'2-digit'})}
                        </div>
                        <h4>Tournament</h4>
                        <h5>
                            {data.is_private ? 'private':'public'}
                        </h5>
                    </div>
                </div>
                <div className="col-md-9">
                    <div className="event-schedule-right">
                        <div className="event-schedule-date" ><span
                            className="icon-friends"></span>{DateTime.fromISO(data.start).toLocaleString(DateTime.DATE_HUGE)}</div>
                        <div className="event-schedule-date"><span
                            className="icon-friends"></span>Via İnternet <a href="www.gamecounter.com">www.gamecounter.com</a>
                        </div>
                        <div className="event-schedule-buttons">
                            <button 
                                onClick={onInterested}
                                className="dd-btn btn-sm btn-gray mr-5 pr-lg-4 pl-lg-4">
                                Interested
                                {
                                    data.user_participant_as === 'interested' ? (
                                        <Tooltip
                                            trigger={<span className="icon icon-ticke ml-2"></span>}
                                        >
                                            <span
                                                className="event-schedule-leave"
                                                onClick={onLeave}
                                            >
                                                Leave Event
                                            </span>
                                        </Tooltip>
                                    ) : null
                                }
                            </button>
                            <button 
                                onClick={onJoin}
                                className="dd-btn btn-sm btn-full pr-lg-5 pl-lg-5">
                                Attending
                                {
                                    data.user_participant_as === 'attends' ? (
                                        <Tooltip
                                            trigger={<span className="icon icon-ticke ml-2"></span>}
                                        >
                                            <span
                                                className="event-schedule-leave"
                                                onClick={onLeave}
                                            >
                                                Leave Event
                                            </span>
                                        </Tooltip>
                                    ) : null
                                }
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}