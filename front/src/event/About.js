import React, {Component} from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import AboutTab from './AboutTab';
import ImageContent from '../profile/media-tabs/image-content';

export default class About extends Component{
    
    render(){
        
        const {about, media} = this.props;

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

                    </TabList>
                    <div className="content">

                        <TabPanel> 

                            <AboutTab description={about} />

                        </TabPanel>

                        <TabPanel> 

                            <div className="user-uploads">
                                <ImageContent 
                                    media={media}
                                    totalImage={media.length}
                                    user={null}
                                    promise={new Promise((resolve, reject) => {
                                        resolve(media)
                                    })}
                                />
                            </div>

                        </TabPanel>

                    </div>
                </Tabs>
            </div>
        )
    }
}