import React, {Component, Fragment} from 'react';
import {Modal} from '../Modal';
import Form from './Form';
import axios from 'axios';

export default class CreateEvent extends Component{

    state = {
        open: false
    }

    doOpen()
    {
        this.setState(() => {
            return {
                open: true
            }
        })
    }

    doClose()
    {
        this.setState(() => {
            return {
                open: false
            }
        })
    }

    onSave()
    {
        axios.post(`/event/store`, this.contentRef)
        .then(({data}) => this.setState({open: false}))
        .catch(err => console.log(err))
    }

    render()
    {   
        const actions = [
            {
                title: `Close`,
                onAction:this.doClose.bind(this),
                class: `btn-empty`
            },
            {
                title: `Create`,
                onAction: this.onSave.bind(this),
                class: `btn-full`
            }
        ];

        return (
            <Fragment>
                <Modal 
                    open={this.state.open}
                    onClose={this.doClose.bind(this)}
                    title={'Merhaba, Bir event olusturmak istermiydiniz ?'}
                    actions={
                        actions
                    }
                >
                    <Form 
                        onForm={
                            form => {
                                this.contentRef = form;
                            }
                        }
                    />
                </Modal>
                <button 
                    onClick={this.doOpen.bind(this)}
                    className="dd-btn btn-sm btn-full"
                >Create Event</button>
            </Fragment>
        )
    }
}