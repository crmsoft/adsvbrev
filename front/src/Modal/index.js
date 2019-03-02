import React, {Component, Fragment} from 'react';
import Popup from 'reactjs-popup';
import Header from './Header';
import {Footer} from './Footer';

export const Modal = (
    {
        open, 
        onClose,
        Content,
        actions,
        title,
        onRef
    }
) => {


    return class DDModal extends Component{

        constructor(...props)
        {
            super(...props);
            this.contentRef = React.createRef();
        }

        componentDidMount()
        {
            console.log(this.contentRef, onRef);
            
            onRef ? onRef(this.contentRef) : null;
        }

        render()
        {
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
                        <Content 
                            ref={this.contentRef}
                        />
                        <Footer 
                            actions={actions}
                        />
                    </Fragment>
                </Popup>
            )
        }

    }
}