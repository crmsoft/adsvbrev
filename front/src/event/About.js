import React, {Component} from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import AboutTab from './AboutTab';

export default class About extends Component{
    
    render(){
        
        const {about} = this.props;

        return (
            <div className="profile-about">
                <Tabs>
                    <TabList className="nav nav-tabs">
                        <Tab selectedClassName="active">
                            <a href="javascript:void(0);">
                                <span className="icon-profile">
                                    {" About Event"}
                                </span>
                            </a>
                        </Tab>
                    </TabList>
                    <div className="content">
                        <TabPanel> 

                            <AboutTab description={about} />

                        </TabPanel>
                    </div>
                </Tabs>
            </div>
        )
    }
}