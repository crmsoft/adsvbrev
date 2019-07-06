import React from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

import store from '../redux/store';
import {LEAVE_GROUP} from '../redux/actions';

const leave = id => {

    axios.post(`/group/${id}/leave`);

    store.dispatch({
        type: LEAVE_GROUP,
        data: id
    })
}

const GroupListItem = ({group, isGuest}) => {
    return (
        <div className="user-list-item p-3">
            <Link to={`/gr/${group.username}`} className="d-flex">
                <div className="user-list-ava">
                    <img src={`${group.ava}`}/>
                </div>
                <div className="user-list-user">
                    <span style={{fontWeight:'bold'}}>{group.full_name}</span>
                </div>
            </Link>
            {
                (group.manages || isGuest) ? null : (
                    <div>
                        <button 
                            onClick={e => leave(group.username)}
                            className="dd-btn btn-sm btn-gray">Leave</button>
                    </div>
                )
            }
        </div>
    )
}

export default GroupListItem;