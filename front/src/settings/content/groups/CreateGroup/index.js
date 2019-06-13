import React, {Component} from 'react';
import axios from 'axios';

import {Modal} from '../../../../Modal';
import Form from './Form';

export default class CreateGroup extends Component {
    
    state = {
        show: false,
        frm: null,
        submit: false,
        errors: {}
    }


    hideCreateGroup()
    {
        this.setState(() => {
            return {
                show: false
            }
        })
    }

    storeGroup()
    {
        this.setState(() => ({submit:true}))
        const {frm} = this.state;
        axios.post('/groups/store', frm)
        .then(({data}) => {
            this.props.onGroup(data.data);
            this.setState(() => ({errors: {}, show: false, submit:false}))
        })
        .catch(({response}) => {
            if(response.status == 422){
                this.setState(() => ({
                    errors: response.data.errors,
                    submit:false
                }));
            } // end if
        })
    }

    render()
    {
        const actions = [
            {
                title: 'Close',
                onAction: this.hideCreateGroup.bind(this),
                class: 'btn-empty'
            },
            {
                title: 'Create',
                onAction: this.storeGroup.bind(this)
            }
        ];
        const {submit, show, errors} = this.state;

        return (
            <div>
                <button 
                    onClick={e => this.setState(() => ({show:true}))}
                    className="btn dd-btn btn-full btn-sm mb-2">
                    <span className="icon-plus"></span>    
                    {` Create new group`}
                </button>   
                <Modal 
                    open={show}
                    title={`Create a new Group`}
                    actions={actions}
                    onClose={this.hideCreateGroup.bind(this)}
                    processing={submit}
                >
                    <div className="form-create-group">
                        <Form 
                            errors={errors}
                            onForm={frm => this.setState(() => ({frm:frm}))}
                        />
                    </div>
                </Modal>
            </div>
        )
    }
}