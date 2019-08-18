import React, {Component} from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import AboutTab from './AboutTab';
import MyDevice from './MyDevice';
import ImageContent from '../media-tabs/image-content';

export default class About extends Component{
    
    render(){
        const {user, totalImage} = this.props;
        
        return (
            <div className="profile-about">
                <Tabs>
                    <TabList className="nav nav-tabs">
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
                                <span className="icon-info"></span>
                                <span className="tab-title">
                                    {" About Me"}
                                </span>
                            </a>
                        </Tab>
                        <Tab selectedClassName="active">
                            <a href="javascript:void(0);">
                                <span className="icon-pc"></span>
                                <span className="tab-title">
                                    {" My Devices"}
                                </span>
                            </a>
                        </Tab>
                    </TabList>
                    <div className="content user-uploads">
                        <TabPanel>
                            <ImageContent 
                                media={user.media}
                                user={user.profile.user}
                                totalImage={totalImage}
                            />
                        </TabPanel>
                        <TabPanel> 

                            <AboutTab profile={user.profile} />

                        </TabPanel>
                        <TabPanel>
                            <MyDevice guest={this.props.isGuest} profile={user.profile} />
                        </TabPanel>

                    </div>
                </Tabs>
            </div>
        )
    }
}