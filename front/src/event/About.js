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
                                <span className="icon-info"></span>
                                <span className="tab-title">
                                    {" About Event"}
                                </span>
                            </a>
                        </Tab>

                        <Tab selectedClassName="active">
                            <a href="javascript:void(0);">
                                <span className="icon-picture"></span>
                                <span className="tab-title">
                                    {" Images"}
                                </span>
                            </a>
                        </Tab>

                        <Tab selectedClassName="active">
                            <a href="javascript:void(0);">
                                <span className="icon-play"></span>
                                <span className="tab-title">
                                    {" Videos"}
                                </span>
                            </a>
                        </Tab>
                    </TabList>
                    <div className="content">
                        <TabPanel> 

                            <AboutTab description={about} />

                        </TabPanel>

                        <TabPanel> 

                            Images of the event ....

                        </TabPanel>

                        <TabPanel> 

                            Will be available soon...

                        </TabPanel>
                    </div>
                </Tabs>
            </div>
        )
    }
}