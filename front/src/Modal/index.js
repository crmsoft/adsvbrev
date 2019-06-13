import React, {Fragment} from 'react';
import PropTypes from 'prop-types';

import Popup from 'reactjs-popup';
import Header from './Header';
import {Footer} from './Footer';

export const Modal = (props) => {
    
    const  {
        open,
        onClose,
        title,
        actions,
        processing
    } = props;

    return (
        <Popup
            className={processing ? `dd-modal processing` : `dd-modal`}
            onClose={onClose}
            open={open}
            modal={true}
        >
            <Fragment>
                <Header 
                    title={title}
                    onClose={onClose}
                />
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