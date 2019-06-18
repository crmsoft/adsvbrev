import React, {useState, useEffect} from 'react';
import axios from 'axios';

import {Modal} from '../Modal';
import UserComponent from './User';
import store from './redux/store';
import {CHAT_PUSH} from './redux/events';

const User = ({
    user,
    toggle
}) => {
    return (
        <li 
            onClick={e => toggle(user.username)}
            className="list-unstyled position-relative container"
        >
            <div className="row border-0 p-0">
                <div className="col-auto text-center checkbox-container">
                    <label className="form-input-container">
                        <input 
                            type="checkbox" 
                            checked={user.selected}    
                        />
                        <span className="checkmark"></span>
                    </label>
                </div>
                <div className="col">
                    <UserComponent data={user} onClick={() => {}} />
                </div>
            </div>
        </li>
    )
}

const FriendList = ({
    list,
    toggle
}) => {
    return (
        <ul className="m-0 p-0 list-scroll pt-2 create-group-list">
            {
                list.map(user => <User key={user.username} toggle={toggle} user={user}/>)
            }
        </ul>
    )
}

export default ({
    onClose,
    open,
    list
}) => {

    const [processing, setProcessing] = useState(false);
    const [users, setUsers] = useState(list);
    const [user, setUser] = useState(null);

    useEffect(() => {        
        const u = [...users];  
        if (user)
        {
            for (let index = 0; index < u.length; index++) {
                if (u[index].username === user)
                {                    
                    u[index].selected = !u[index].selected;
                    break;
                } // end if
            } // end for
            setUsers(u);
            setUser(null);
        }
    }, [user]);

    const onSubmit = () => {
        if (processing)
        {
            return;
        } // end if

        const selected_users = users.filter(user => user.selected).map(user => user.username);

        if (!selected_users.length)
        {
            return;
        } // end if

        setProcessing(true);
        axios.post(`/chat/create`, {
            users: selected_users
        })
        .then(({data}) => {
            setProcessing(false);
            store.dispatch({
                type: CHAT_PUSH,
                data: data.data
            });
            // clear selection
            setUsers(
                users.map(user => {user.selected = false; return user;})
            );
            onClose();
        })
        .catch(err => {
            setProcessing(false);
            alert('Error');
        })
    }

    const actions = [
        {
            title: 'Cancel',
            onAction:onClose,
            class: `btn-empty`
        },
        {
            title: 'Create',
            onAction: onSubmit
        }
    ];

    return (
        <Modal
            processing={processing}
            open={open}
            onClose={onClose}
            title={'Please choose participants'}
            actions={actions}
        >
            <FriendList 
                toggle={setUser}
                list={users}
            />
        </Modal>
    )
}