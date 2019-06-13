import React, {Component, Fragment} from 'react';
import {components} from 'react-select';
import axios from 'axios';

import {Select} from '../../../../select';
import {User} from '../../../../select/formaters/User';
import {Game} from '../../../../select/formaters/Game';
import {Confirm} from '../../../../general/Confirm';

const MultiValueLabel = ({ children, ...props }) => {    
    return (
        <components.MultiValueLabel key={props.data.id} {...props}>{props.data.full_name}</components.MultiValueLabel>
    );
} 

const searchUser = query => {
    return new Promise((resolve, reject) => {
        axios.get(`/filter/users/${query}`)
        .then(({data}) => resolve(data.data))
        .catch(err => reject(err))
    })
}

const searchGames = query => {
    return new Promise((resolve, reject) => {
        axios.get(`/filter/games/${query}`)
        .then(({data}) => {
            resolve(data.data)
        })
        .catch(err => reject(err))
    });
}

export class Form extends Component{
    
    state = {
        frm: null,
        touched: false,
        errors: {}
    }

    static getDerivedStateFromProps(props, state)
    {
        if (!state.frm){
            return {
                name: props.data.name,
                description: props.data.description,
                is_private: props.data.is_private,
                frm: new FormData()
            }
        }

        return null;
    }

    setValue(name, value)
    {   
        this.setState(() => {
            return {
                [name] : value,
                touched: true
            }
        }, () => {
            this.state.frm.delete(name);
            this.state.frm.append(name, value);
            //this.props.onForm(this.state.frm);
        })
    }

    submit()
    {
        const {data} = this.props;
        const {frm} = this.state;

        this.setState(state => ({errors: {}}));

        axios.post(`groups/${data.id}/update`, frm)
        .catch(({response}) => {
            if(response.status == 422){
                this.setState(() => ({
                    errors: response.data.errors,
                }));
            } // end if
        });
    }

    delete()
    {
        axios.post(`/groups/${this.props.data.id}/destroy`)
        .then(response => this.props.onDelete())
        .catch(err => alert('Error'))
    }

    render()
    {
        const {data} = this.props;
        const {name, description, is_private, errors, touched} = this.state;

        return (
            <Fragment>
                {
                    data.moderators ? (
                        <div className="row">
                            <div className="col-6">
                                Authorized Moderators
                                <small className="d-block text-hint">The list of members that can manage this group</small>
                            </div>
                            <div className="col-6">
                                <Select 
                                    hasError={errors.managers}
                                    defaultValue={data.moderators}
                                    onChange={selected => this.setValue('managers', (selected ? selected:[]).map(opt => opt.username).join(','))}
                                    isMulti
                                    components={{MultiValueLabel}}
                                    loadOptions={searchUser}
                                    cacheOptions={true}
                                    formatOptionLabel={User}
                                />
                            </div>
                        </div>
                    ) : null
                }

                <div className="row">
                    <div className="col-6">
                        Related Games
                        <small className="d-block text-hint">List of games with which the group is related</small>
                    </div>
                    <div className="col-6">
                        <Select 
                            hasError={errors.related}
                            defaultValue={data.related}
                            onChange={selected => this.setValue('related', (selected ? selected:[]).map(opt => opt.id).join(','))}
                            isMulti
                            components={{MultiValueLabel}}
                            loadOptions={searchGames}
                            cacheOptions={true}
                            formatOptionLabel={Game}
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="col-6">
                        Ban member
                        <small className="d-block text-hint">List of gamers that are not allowed to intend in group</small>
                    </div>
                    <div className="col-6">
                        <Select 
                            defaultValue={data.banned}
                            onChange={selected => this.setValue('banned', (selected ? selected:[]).map(opt => opt.username).join(','))}
                            isMulti
                            components={{MultiValueLabel}}
                            loadOptions={searchUser}
                            cacheOptions={true}
                            formatOptionLabel={User}
                        />
                    </div>
                </div>

                {
                    data.role == 'administrator' ? (
                        <div className="row">
                            <div className="col-6">
                                Name
                            </div>
                            <div className="col-6">
                                <input 
                                    className={errors.name ? 'has-error':''}
                                    onChange={e => this.setValue('name', e.target.value)}
                                    type="text" 
                                    name="name" 
                                    value={name} 
                                />
                                <small className="d-block text-hint">/g/{data.id}</small>
                            </div>
                        </div>
                    ) : null
                }
                

                <div className="row">
                    <div className="col-6">
                        Description
                        <small className="d-block text-hint">promote your game</small>
                    </div>
                    <div className="col-6">
                        <textarea 
                            className={errors.description ? 'has-error':''}
                            onChange={e => this.setValue('description', e.target.value)} 
                            type="text" 
                            name="name" 
                            value={description} 
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="col-6">
                        Is Private
                    </div>
                    <div className="col-6">
                        <label className="form-input-container">
                            <input 
                                className={errors.name ? 'has-error':''}
                                onChange={e => this.setValue('is_private', e.target.checked)}
                                type="checkbox" 
                                name="is_private" 
                                checked={is_private}
                                value='private' 
                            />
                            <span className="checkmark"></span>
                        </label>
                    </div>
                </div>

                {
                    data.role == 'administrator' ? (
                        <div className="row">
                            <div className="col-6">
                                Delete Group
                                <small className="d-block text-hint">After this action you won't be able to recover</small>
                            </div>
                            <div className="col-6 text-right">
                                <Confirm 
                                    onCancel={e => this.setState(state => ({confirm:false}))}
                                    onConfirm={this.delete.bind(this)}
                                    ask={this.state.confirm}
                                />
                                <button 
                                    onClick={e => this.setState(state => ({confirm: true}))}
                                    className="dd-btn btn-sm btn-red">Delete</button>
                            </div>
                        </div>       
                    ) : null
                }

                <div className="text-center mt-3">
                    
                    <button 
                        disabled={!touched}
                        onClick={this.submit.bind(this)}
                        className="dd-btn btn-sm">
                        Update
                    </button>
                </div>

            </Fragment>
        )
    }
}