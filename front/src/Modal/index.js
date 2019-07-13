import React, {Fragment} from 'react';
import PropTypes from 'prop-types';

import Popup from 'reactjs-popup';
import Header from './Header';
import {Footer} from './Footer';

export const actions = (cancel, submit) => [
    {
        title: 'Cancel',
        onAction: cancel,
        class: `btn-empty`
    },
    {
        title: 'Submit',
        onAction: submit
    }
];  

export const Modal = (props) => {
    
    const  {
        onClose,
        title,
        actions,
        processing,
        cls = ''
    } = props;

    return (
        <Popup
            className={processing ? `${cls} dd-modal processing` : `${cls} dd-modal`}
            {...props}
            modal={true}
        >
            <Fragment>
                {
                    title ? <Header 
                        title={title}
                        onClose={onClose}
                    /> : null
                }
                {props.children}
                <Footer 
                    actions={actions}
                />
            </Fragment>
        </Popup>
    )
}

Modal.propTypes = {
    actions: PropTypes.array,
    onClose: PropTypes.func,
    title: PropTypes.string,
    open: PropTypes.bool,
    processing: PropTypes.bool
}