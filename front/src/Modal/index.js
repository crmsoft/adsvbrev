import React, {Component, Fragment} from 'react';
import Popup from 'reactjs-popup';
import Header from './Header';
import {Footer} from './Footer';

export const Modal = (props) => {
    
    const  {
        open,
        onClose,
        title,
        actions
    } = props;

    return (
        <Popup
            className={`dd-modal`}
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