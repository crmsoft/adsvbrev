import React, { Component } from 'react';
import Submit from "../submit";

export default class SecurityForm extends Component{

    constructor(props){
        super(props);

        this.state = {
            password: '',
            newPassword: ''
        }

        this.onFieldChange = this.onFieldChange.bind(this);
    }

    onFieldChange(event){
        const fieldName = event.target.name;
        this.setState({
            [fieldName]: event.target.value
        })
    }

    render(){
        return (
            <div>

                <div className="row">
                    <div className="col content-top">
                        <label>
                            Current Password
                        </label>
                    </div>
                    <div className="col">
                        <input onChange={this.onFieldChange} type="password" name="password" value={this.state.password} />   
                    </div>
                </div>

                <div className="row">
                    <div className="col content-top">
                        <label>
                            New Password
                        </label>
                    </div>
                    <div className="col">
                        <input onChange={this.onFieldChange} type="password" name="newPassword" value={this.state.newPassword} />   
                    </div>
                </div>
                <Submit active={{}} handleSubmit={ () => this.props.save(this.state) }/>                
            </div>
        )
    }

}