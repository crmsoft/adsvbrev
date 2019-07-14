import React, {Component, Fragment} from 'react';
import {Modal, actions} from '../Modal';
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

        const {errors, open} = this.state;

        return (
            <Fragment>
                <Modal 
                    processing={this.state.processing}
                    open={open || this.props.open}
                    onClose={this.doClose.bind(this)}
                    title={'Create an event'}
                    actions={
                        actions(this.doClose.bind(this), this.onSave.bind(this))
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
                    className="dd-btn btn-sm btn-full btn-create-event"
                >Create Event</button>
            </Fragment>
        )
    }
}