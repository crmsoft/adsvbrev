import React, {Component} from 'react';
import Popup from 'reactjs-popup';
import AvaPopupContent from './AvaPopupContent';
import axios from 'axios';
import store from '../../fetch/store';
import { updateProfile } from '../../fetch/events';
import {Modal} from '../../../Modal';

export default class AvaPopup extends Component{
    
    state = {}

    constructor(props){
        super(props);
        this.closeModal = this.closeModal.bind(this)
        this.selectFile = this.selectFile.bind(this);
        this.fileInputRef = React.createRef();
        this.upload = this.upload.bind(this);
    }

    closeModal () {
        this.setState(() => {
            // clear last selection;
            return {src:false}
        }, () => this.props.closeModal());
    }

    upload(){
        // create payload
        const formData = new FormData();
        formData.append('ava', this.fileInputRef.current.files[0]);
        /**
         * onUploadProgress: ProgressEvent => {
            this.setState({
                loaded: (ProgressEvent.loaded / ProgressEvent.total*100),
            })
          },
         */

        axios.post('/profile/ava', formData)
        .then(response => {
            this.setState({src:`/${response.data}`});
            store.dispatch(updateProfile(response.data));
        })
        .catch(err => console.log(err))
    }

    selectFile( files ){
        if (files && files.length > 0) {
            const reader = new FileReader();
            reader.addEventListener('load', () =>
                this.setState({ src: reader.result }),
            );
            reader.readAsDataURL(files[0]);
        }
    }

    render(){

        const actions = [
            {
                title: `Close`,
                onAction: this.closeModal.bind(this),
                class: `btn-empty`
            },
            {
                title: `Choose`,
                onAction: () => this.fileInputRef.current.click(),
            }
        ];

        if (this.state.src)
        {
            actions.push({
                title: `Upload`,
                onAction: this.upload.bind(this)
            });
        } // end if

        return (  
            <Modal
                open={this.props.show}
                onClose={this.closeModal.bind(this)}
                actions={actions}
                title={`Upload Avatar`}
            >
                <div className="popup-content">
                    <div style={{display:'none'}}>
                        <input onChange={ e => { this.selectFile(e.target.files); }} ref={this.fileInputRef} type="file" />
                    </div>
                    <AvaPopupContent ava={this.state.src ? this.state.src : this.props.ava} />
                </div>
            </Modal>
        )
    }
}