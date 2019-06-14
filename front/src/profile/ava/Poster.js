import React, {Component} from 'react';

import axios from 'axios';

import {Modal} from '../../Modal';
import store from '../fetch/store';
import {
    COVER_UPLOADED
} from '../fetch/actions';

const MessageNotUploadedYet = () => {
    return (
        <div className="alert">
            <p className="text-center">
                Upload cover to your profile !
            </p>
        </div>
    )
}

const img_style = {
    display: `block`,
    width: `auto`,
    margin: `0 auto`,
    maxHeight: `250px`
}

export default class Poster extends Component{

    state = {
        show: false,
        processing: false
    }

    constructor(props)
    {
        super(props);
        this.fileRef = React.createRef();
        
    }

    onClose()
    {
        this.setState(() => {
            return {
                show: false
            }
        })
    }

    show()
    {
        this.setState(() => {
            return {
                show: true
            }
        })
    }

    onFile(e)
    {
        const {files} = e.target;

        if (files && files.length)
        {
            const reader = new FileReader();
            reader.onload = e => {
                this.setState(() => {
                    return {
                        chosen: e.target.result,
                        file: files[0]
                    }
                })
            };
            reader.readAsDataURL(files[0]);
        } // end if
    }

    submit()
    {
        const frm = new FormData();
        frm.append(`ava`, this.state.file);
        frm.append(`cover`, true);

        this.setState(() => ({processing:true}))

        axios.post(`/profile/ava`, frm)
        .then(({data}) => {
            this.setState(() => ({processing:false}))
            store.dispatch({
                type: COVER_UPLOADED,
                data: data
            });
            this.onClose();
        })
    }

    render()
    {
        const {
            show,
            chosen,
            processing
        } = this.state;

        const {cover} = this.props.src.profile;

        const actions = [
            {
                title: `Close`,
                onAction: this.onClose.bind(this),
                class: `btn-empty`
            },
            {
                title: `Choose`,
                onAction: () => this.fileRef.current.click()
            }
        ];

        if (chosen)
        {
            actions.push({
                title: `Upload`,
                onAction: this.submit.bind(this)
            })
        } // end if

        return (
            <div className="profile-upload-cover">
                <input 
                    onChange={this.onFile.bind(this)}
                    type="file" 
                    style={{display:`none`}} 
                    ref={this.fileRef} 
                />
                <Modal
                    processing={processing}
                    title={`Upload Cover`}
                    onClose={this.onClose.bind(this)}
                    actions={actions}
                    open={show}
                >
                    {
                        (!cover && !chosen) ? <MessageNotUploadedYet /> : (
                            <img src={chosen ? chosen : cover} style={img_style} />
                        )
                    }
                </Modal>
                <button
                    className="btn-select-picture"
                    onClick={this.show.bind(this)}
                >
                    <span className="icon-select-picture"></span>
                    <span className="text" style={{fontSize: `11px`}}>
                        {` Update cover photo`}
                    </span>
                </button>
            </div>
        )
    }
}