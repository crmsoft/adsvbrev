import React, { Component } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import axios from 'axios';

import ProfileForm from './content/profile';
import SecurityForm from './content/security';

export default class SettingsContnet extends Component {

    state = {}

    constructor(props){
        super(props);

        this.saveChanges = this.saveChanges.bind(this);
    }

    componentDidMount(){
        this.props.data.init();
    }

    saveChanges(data){

        const fr = new FormData();
        for(let key in data){
            fr.append(key, data[key]);
        }
        
        axios.post(`/settings`, fr)
        .then(response => this.setState({
            done: true,
            errors: false
        }))
        .catch(({response}) => {
            if(response.status == 422){
                this.setState({
                    errors: response.data.errors
                });
            }
        })
    }

    render(){
        return (
            <Tabs>
                <TabList className="nav nav-tabs">
                    <Tab selectedClassName="active">
                        <a href="javascript:void(0);">
                            <span className="icon-art">
                                {" Profile"}
                            </span>
                        </a>
                    </Tab>
                    <Tab selectedClassName="active">
                        <a href="javascript:void(0);">
                            <span className="icon-art">
                                {" Security"}
                            </span>
                        </a>
                    </Tab>
                </TabList>
                <div className="content">
                    <TabPanel> 
                        
                        <ProfileForm 
                            profile={this.props.data.info.profile} 
                            errors={this.state.errors} 
                            save={this.saveChanges} 
                        />
                        
                    </TabPanel>
                    <TabPanel>
                        
                        <SecurityForm errors={this.state.errors} save={this.saveChanges} />

                    </TabPanel>
                </div>
            </Tabs>
        )
    }
}