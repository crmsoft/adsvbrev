import React from 'react';
import FriendShipAction from './FriendShipAction';
import MessageAction from './MessageAction';
import store from '../../friedship/store';
import {Provider} from 'react-redux';

const ProfileActions = () => {
    return (
        <div className="profile-quick-actions">
            <MessageAction />
            <Provider store={store}>
                <FriendShipAction />
            </Provider>
        </div>
    )
}

export default ProfileActions;