import React, {Fragment, useState, useEffect} from 'react';
import axios from 'axios';

import Tooltip from '../../Modal/Tooltip';
import store from '../redux/store';
import {CHAT_REMOVE} from '../redux/events';
import CreateGroup from '../CreateGroup';

const DialogOptions = ({
    hash_id,
    onDestroy
}) => {
    
    const destroy = () => {
        axios.post(`/chat/${hash_id}/destroy`)
        .then(({data}) => {
            onDestroy(hash_id)
        })
        .catch(err => alert('Error'))
    }
    
    return (
        <ul className="dialog-options">
            <li
                onClick={destroy}
            >Delete dialog</li>
        </ul>
    )
}
const GroupMember = ({
    hash_id,
    onLeave
}) => {
    
    const leave = () => {
        axios.post(`/chat/group/${hash_id}/leave`)
        .then(({data}) => {
            onLeave(hash_id)
        })
        .catch(err => alert('Error'));
    }

    return (
        <ul className="dialog-options">
            <li onClick={leave}>Leave group</li>
        </ul>
    )
}
const GroupAdmin = ({
    hash_id,
    onDestroy,
    onEdit
}) => {


    const destroy = () => {
        axios.post(`/chat/group/${hash_id}/destroy`)
        .then(({data}) => {
            onDestroy(hash_id)
        })
        .catch(err => console.log(err ));
    }

    return (
        <Fragment>
            <ul className="dialog-options">
                <li
                    onClick={e => onEdit(true)}
                >Edit group</li>
                <li
                    onClick={destroy}
                >Delete group</li>
            </ul>
        </Fragment>
    )
}

/**
 * Header Component
 */
export default ({
    chat, members, me, closeChat
}) => {
    const [open, setOpen] = useState(false);

    const removeChat = hash_id => {
        store.dispatch({
            type:CHAT_REMOVE,
            data:hash_id
        });
        closeChat();
    }

    const member_list = members.map(member => {
        return me === member.username ? 'Me' :  member.first_name
    }).join(', ');
    
    return (
        <div className="dialog-head">
            <CreateGroup 
                update={chat.hash_id}
                open={open}
                list={store.getState().messenger.friend.map(friend => { friend.selected = members.filter(m => m.username===friend.username).length; return friend;})}
                onClose={e => setOpen(false)}
            />
            <div className="dialog-title">
                <Tooltip
                    trigger={<span>{member_list}</span>}
                >
                    <spam className='d-block p-2'>{member_list}</spam>
                </Tooltip>
            </div>
            <div className="dialog-actions">
                <span className="pr-1">
                    <Tooltip>
                        {
                            chat.group ? (
                                chat.owner ? <GroupAdmin onEdit={setOpen} onDestroy={removeChat} {...chat} /> : <GroupMember onLeave={removeChat} hash_id={chat.hash_id}/>
                            ) : <DialogOptions {...chat} onDestroy={removeChat}/>
                        }
                    </Tooltip>
                </span>
                <span onClick={e => closeChat()}>
                    ×
                </span>
            </div>
        </div>
    )
}