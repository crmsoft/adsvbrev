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
        axios.post(`/event/store`, this.contentRef.current.state.form)
        .then(({data}) => this.setState({open: false}))
        .catch(err => console.log(err))
    }

    render()
    {
        const Modal_ = Modal({
            open: this.state.open,
            onClose: this.doClose.bind(this),
            Content: Form,
            title: 'Merhaba, Bir event olusturmak istermiydiniz ?',
            actions: [
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
            ],
            onRef: ref => {this.contentRef = ref}
        })

        return (
            <Fragment>
                <Modal_ />
                <button 
                    onClick={this.doOpen.bind(this)}
                    className="dd-btn btn-sm btn-full"
                >Create Event</button>
            </Fragment>
        )
    }
}