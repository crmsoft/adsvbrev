import React, {Component, Fragment} from 'react';
import {Modal} from '../Modal';
import Form from './Form';
import axios from 'axios';

export default class CreateEvent extends Component{

    state = {
        open: false,
        processing: false,
        errors: {}
    }

    doOpen()
    {
        this.setState(() => {
            return {
                open: true,
                processing: false,
                errors: {}
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
        this.setState(() => ({processing:true}))
        axios.post(`/event/store`, this.contentRef)
        .then(({data}) => {
            this.props.onEvent(data.data);
            this.setState({open: false, processing: false})
        })
        .catch(({response}) => {
            this.setState(() => ({processing:false, errors: response.data.errors}))
        })
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

        const {errors} = this.state;

        return (
            <Fragment>
                <Modal 
                    processing={this.state.processing}
                    open={this.state.open}
                    onClose={this.doClose.bind(this)}
                    title={'Create an event'}
                    actions={
                        actions
                    }
                >
                    <Form 
                        errors={errors}
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