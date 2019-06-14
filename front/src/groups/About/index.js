import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';


const About = ({about}) => {
    return (
        <div className="profile-about">
            <Tabs>
                <TabList className="nav nav-tabs">
                    <Tab selectedClassName="active">
                        <a href="javascript:void(0);">
                            <span className="icon-info"></span>
                            {" About Group"}
                        </a>
                    </Tab>
                </TabList>
                <div className="content">
                    <TabPanel> 

                        <p>
                            {about}
                        </p>

                    </TabPanel>
                </div>
            </Tabs>
        </div>
    )
}

export default About;