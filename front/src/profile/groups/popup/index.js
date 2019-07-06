import React from 'react';

import {Modal} from '../../../Modal';
import GroupListContent from './popup-content';

const GroupList = ({show, closeModal, user, isGuest}) => {    
    const actions = [
        {
            title: 'Ok',
            onAction: () => closeModal()
        }
    ]
    
    return (
        <Modal
            title={'Groups you intend to'}
            onClose={() => closeModal()}
            open={show}
            actions={actions}
        >
            <GroupListContent 
                isGuest={isGuest}
                user={user}
            />
        </Modal>   
    )
}


export default GroupList;