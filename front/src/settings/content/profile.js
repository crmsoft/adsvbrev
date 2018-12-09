import React, { Component } from 'react';
import Submit from "../submit";
import Label from '../partials/Label';
import timeZones from '../partials/timezones';
import Hint from '../partials/Hint';
import errorClass from './ErrorClass';

export default class ProfileForm extends Component{

    constructor(props){
        super(props);

        this.state = { 
            editetFields: {
                
            }
        }

        this.onFieldChange = this.onFieldChange.bind(this);
    }

    onFieldChange(event){
        const name = event.target.name;
        const value = event.target.value;
        this.setState(state => {
            return {
                editetFields: {
                    ...state.editetFields,
                    [name]: value
                }
            }
        })
    }   

    componentWillReceiveProps(newProps){
        errorClass.setErrors(newProps.errors);
    }

    render(){
        const profile = this.props.profile;
        const {editetFields} = this.state;
        return (
            <div>
                <div className="row">
                    <Label text="First Name" />
                    <div className="col">
                        <input 
                            type="text"
                            className={errorClass.get('first_name')} 
                            onChange={this.onFieldChange} 
                            name="first_name" 
                            value={editetFields.first_name ? editetFields.first_name:profile.user.first_name} 
                            className="input" 
                        />
                    </div>
                </div>
                <div className="row">
                    <Label text="Last Name" />
                    <div className="col">
                        <input 
                            type="text"
                            className={errorClass.get('last_name')} 
                            onChange={this.onFieldChange} 
                            name="last_name" 
                            value={this.state.editetFields.last_name ? editetFields.last_name : profile.user.last_name} 
                            className="input" 
                        />
                    </div>
                </div>
                <div className="row">
                    <Label text="About you" />
                    <div className="col">
                        <textarea 
                            className={errorClass.get('about')} 
                            onChange={this.onFieldChange} 
                            name="about" 
                            value={editetFields.about ? editetFields.about:profile.about} 
                            className="input" 
                        />
                        <Hint text="Leave a few words about you... and likely you going to find friends in same interest" />
                    </div>
                </div>

                <div className="row">
                    <Label text="Birthday" />
                    <div className="col">
                        <input 
                            value={editetFields.dob ? editetFields.dob : profile.dob}
                            className={errorClass.get('dob')} onChange={this.onFieldChange} type="date" name="dob" />   
                        <Hint text="Do not let your friends miss your bithday !" />
                    </div>
                </div>

                <div className="row">
                    <Label text="Select your timezone" />
                    <div className="col">
                        <select value={editetFields.timezone ? editetFields.timezone : profile.timezone} className={errorClass.get('timezone')} onChange={this.onFieldChange} name="timezone">
                            {
                                timeZones.map((timezone, index) => {
                                    return <option key={index} value={timezone.value}>{timezone.name}</option>
                                })
                            }    
                        </select>   
                        <Hint text="Set your timezone corretly to be notified about tournaments and events in time !" />
                    </div>
                </div>

                <div className="row">
                    <Label text="Password" />
                    <div className="col">
                        <div>
                            <Hint text="Enter current password" />
                            <input className={errorClass.get('password')} onChange={this.onFieldChange} type="password" name="password" />
                        </div>
                        <div className="mt-2">
                            <Hint text="Enter new password" />
                            <input className={errorClass.get('new_password')} onChange={this.onFieldChange} type="password" name="new_password" />
                        </div>
                    </div>
                </div>
                
                <div className="row">
                    <Label text="Email" />
                    <div className="col">
                        <div>
                            <input
                                value={editetFields.email ? editetFields.email : profile.user.email} 
                                className={errorClass.get('email')}  onChange={this.onFieldChange} type="email" name="email" />
                        </div>
                    </div>
                </div>

                <div className="row">
                    <Label text="Username" />
                    <div className="col">
                        <div>
                            <input 
                                value={editetFields.username ? editetFields.username : profile.user.username} 
                                className={errorClass.get('username')} onChange={this.onFieldChange} type="text" name="username" />
                            <Hint text="Not a good practice, but if you wont we never mind" />
                        </div>
                    </div>
                </div>
                
                <div className="row">
                    <Label text="Phonr Number" />
                    <div className="col">
                        <div>
                            <input 
                                value={editetFields.phone ? editetFields.phone : profile.phone}
                                className={errorClass.get('phone')} onChange={this.onFieldChange}  type="text" name="phone" />
                        </div>
                    </div>
                </div>

                <div className="row">
                    <Label text="Gender" />
                    <div className="col">
                        <div>
                            <select value={editetFields.gender ? editetFields.gender : profile.gender} className={errorClass.get('gender')} onChange={this.onFieldChange} name="gender">
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>
                        </div>
                    </div>
                </div>

                <Submit 
                    active={editetFields} 
                    handleSubmit={ () => this.props.save(this.state.editetFields)} 
                />
            </div>
        )
    }

}