import React from 'react';
import FriendShipAction from './FriendShipAction';
import MessageAction from './MessageAction';

const ProfileActions = () => {
    return (
        <div className="profile-quick-actions">
            <MessageAction />
            <FriendShipAction />
        </div>
    )
}

export default ProfileActions;