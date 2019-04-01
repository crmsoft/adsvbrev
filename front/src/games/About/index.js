import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import TabCountent from './TabContent';

const About = () => {
    return (
        <div className="profile-about">
            <Tabs>
                <TabList className="nav nav-tabs">
                    <Tab selectedClassName="active">
                        <a href="javascript:void(0);">
                            <span className="icon-info"></span>
                            {" About Game"}
                        </a>
                    </Tab>
                </TabList>
                <div className="content">
                    <TabPanel> 

                        <TabCountent  />

                    </TabPanel>
                </div>
            </Tabs>
        </div>
    )
}

export default About;