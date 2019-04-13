import React, {Component} from 'react';
import {DateTime} from 'luxon';

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
            name: '',
            description: '',
            date: DateTime.fromMillis((+ new Date))
        }

        this.state.form.append('start', DateTime.fromMillis((+ new Date)).toISODate());
    }

    setValue(name, value)
    {   
        this.setState(() => {
            return name === 'start' ? {
                date: DateTime.fromISO(value),
                [name] : value
            } : {
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
            this.setValue(`poster`, files[0]);
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
                            Images for Event
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
                                    className={"event-ava back-img " + (srcAva.length ? 'selected':'')}
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
                                    className={"event-cover back-img " + (srcCover.length ? 'selected':'')}>
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
                            Event Name
                        </label>
                    </div>
                    <div className="col-8">
                        <input 
                            value={name}
                            onChange={e => this.setValue('name', e.target.value)}
                            name="event-name" 
                            type='text' 
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="col-4">
                        <label>
                            Event Date
                        </label>
                    </div>
                    <div className="col-8">
                        <input 
                            min={DateTime.fromMillis(+ new Date).toISODate()}
                            onChange={e => this.setValue.call(this,'start', e.target.value)}
                            value={date.toISODate()}
                            type='date' 
                            name='event-date' 
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="col-4">
                        <label>
                            About Event
                        </label>
                    </div>
                    <div className="col-8">
                        <textarea 
                            value={description}
                            onChange={e => this.setValue('description', e.target.value)}
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="col-4">
                        <label>
                            This is private Event
                        </label>
                    </div>
                    <div className="col-8">
                        <label className="form-input-container">
                            <input 
                                value={name}
                                onChange={e => this.setValue('is-private', e.target.value)}
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