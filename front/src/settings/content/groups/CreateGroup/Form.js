import React, {Component} from 'react';
import AsyncSelect from 'react-select/async';
import {components} from 'react-select';
import PropTypes from 'prop-types';

import {Game} from '../../../../select/formaters/Game';
import axios from 'axios';

const searchGames = query => {
    return new Promise((resolve, reject) => {
        axios.get(`/filter/games/${query}`)
        .then(({data}) => {
            resolve(data.data)
        })
        .catch(err => reject(err))
    });
}

const MultiValueLabel = ({ children, ...props }) => {    
    return (
        <components.MultiValueLabel {...props}>{props.data.full_name}</components.MultiValueLabel>
    );
} 

export default class Form extends Component{

    constructor(...props)
    {
        super(...props);

        this.avaFileInput = React.createRef();
        this.coverFileInput = React.createRef();


        this.state = {
            form: new FormData(),
            srcAva: '',
            srcCover: '',
            related: '',
            name: '',
            description: '',
        }
    }

    setValue(name, value)
    {   
        this.setState(() => {
            return {
                [name] : value
            }
        }, () => {
            this.state.form.delete(name);
            this.state.form.append(name, value);
            this.props.onForm(this.state.form);
        })
    }

    onAvaSelect()
    {
        this.avaFileInput.current.click();
    }

    onCoverSelect()
    {
        this.coverFileInput.current.click();
    }
    
    avaSelected( e )
    {
        const files = e.target.files;

        if (files[0])
        {
            this.setValue(`ava`, files[0]);
            const reader = new FileReader();
            reader.addEventListener('load', () =>
                this.setState({ srcAva: reader.result }),
            );
            reader.readAsDataURL(files[0]);
        } // end if
    }

    coverSelected( e )
    {
        const files = e.target.files;

        if (files[0])
        {
            this.setValue(`cover`, files[0]);
            const reader = new FileReader();
            reader.addEventListener('load', () =>
                this.setState({ srcCover: reader.result }),
            );
            reader.readAsDataURL(files[0]);
        } // end if
    }

    render()
    {   
        const {srcAva, srcCover, name, description, date} = this.state; 
        const {errors} = this.props;    
        
        return (
            <div className="schedule-create-form">
                <input 
                    onChange={this.avaSelected.bind(this)}
                    className="d-none" 
                    type="file" 
                    ref={this.avaFileInput}
                />
                <input 
                    onChange={this.coverSelected.bind(this)}
                    className="d-none" 
                    type="file" 
                    ref={this.coverFileInput}
                />
                <div className="row">
                    <div className="col-4">
                        <label>
                            Choose avatar and cover
                        </label>
                    </div>
                    <div className="col-8">
                        <div className="row"> 
                            <div className="col-auto">
                                <div 
                                    style={srcAva.length ? {
                                        backgroundImage: `url(${srcAva})`
                                    } : {}}
                                    onClick={this.onAvaSelect.bind(this)}
                                    className={"event-ava back-img " + (errors.ava ? ' has-error ':'') + (srcAva.length ? ' selected ':'')}
                                >
                                    <span>
                                        Click to Upload
                                    </span>
                                </div>
                            </div>
                            <div className="col">
                                <div 
                                    style={srcCover.length ? {
                                        backgroundImage: `url(${srcCover})`
                                    } : {}}
                                    onClick={this.onCoverSelect.bind(this)}
                                    className={"event-cover back-img " + (errors.cover ? ' has-error ':'') + (srcCover.length ? 'selected':'')}>
                                    <span>
                                        Click to Upload
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-4">
                        <label>
                            Group Name
                        </label>
                    </div>
                    <div className="col-8">
                        <input 
                            value={name}
                            placeholder="CS:GO daily"
                            onChange={e => this.setValue('name', e.target.value)}
                            name="event-name" 
                            type='text' 
                            className={errors.name ? 'has-error':null}
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="col-4">
                        <label>
                            Related Games
                        </label>
                    </div>
                    <div className="col-8">
                        <div className={errors.related ? 'has-error' : null} style={{borderRadius: 3}}>
                            <AsyncSelect
                                onChange={(selectedOption) => {
                                    this.setValue('related', selectedOption ? selectedOption.map(opt => opt.id).join(',') : '')
                                }}
                                styles={{
                                    control: base => ({
                                        ...base,
                                        backgroundColor: '#484B52',
                                        border: 'none'
                                    }),
                                    menuList: base => ({
                                        ...base,
                                        backgroundColor: '#484B52',
                                        height: 150
                                    }),
                                    input: base => ({
                                        ...base,
                                        color: '#fff'
                                    }),
                                    option: (base, state) => ({
                                        ...base,
                                        backgroundColor: null
                                    })
                                }}
                                isMulti
                                components={{MultiValueLabel}}
                                loadOptions={searchGames}
                                cacheOptions={true}
                                formatOptionLabel={Game}
                            />
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-4">
                        <label>
                            About Group
                        </label>
                    </div>
                    <div className="col-8">
                        <textarea 
                            className={errors.description ? 'has-error':null}
                            placeholder="Awesome CS:GO news and ..."
                            value={description}
                            onChange={e => this.setValue('description', e.target.value)}
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="col-4">
                        <label>
                            Is this group private ? 
                        </label>
                    </div>
                    <div className="col-8">
                        <label className="form-input-container">
                            <input 
                                value={name}
                                onChange={e => this.setValue('is_private', e.target.value)}
                                name="event-is-private" 
                                type='checkbox' 
                            />
                            <span className="checkmark"></span>
                        </label>
                    </div>
                </div>

            </div>
        )
    }
}

Form.protoTypes = {
    onForm: PropTypes.func
}