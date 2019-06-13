import React from 'react';

import {Modal} from '../Modal';

export const Confirm = ({
    onConfirm = () => {},
    onCancel = () => {},
    message = 'Do you confirm this action ?',
    ask = false
}) => (
    <Modal
        open={ask}
        title='Confirm the action'
        actions={[
            {
                title: 'Cancel',
                onAction: () => onCancel()
            },
            {
                title: 'Confirm',
                onAction: () => onConfirm(),
            }
        ]}
        onClose={onCancel}
    >
        <div className='alert text-left'>
            {message}
        </div>
    </Modal>
)