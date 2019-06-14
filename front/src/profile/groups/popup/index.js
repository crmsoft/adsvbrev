import React from 'react';

import {Modal} from '../../../Modal';
import GroupListContent from './popup-content';

const GroupList = ({show, closeModal}) => {    
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
            <GroupListContent />
        </Modal>   
    )
}


export default GroupList;