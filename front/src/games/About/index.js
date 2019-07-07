import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import TabContent from './TabContent';

const About = ({about}) => {
    return (
        <div className="profile-about">
            <Tabs>
                <TabList className="nav nav-tabs">
                    <Tab selectedClassName="active">
                        <a href="javascript:void(0);">
                            <span className="icon-info"></span>
                            <span className="tab-title">
                                {" About Game"}
                            </span>
                        </a>
                    </Tab>
                </TabList>
                <div className="content">
                    <TabPanel>
                        <TabContent data={about} />

                    </TabPanel>
                </div>
            </Tabs>
        </div>
    )
}

export default About;