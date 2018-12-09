import React, { Component } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import ImageContent from './image-content';
import VideoContent from './video-cotent';

export default class MediaTabs extends Component {

    constructor(props){
        super(props);

        this.saveChanges = this.saveChanges.bind(this);
    }

    saveChanges(data){

    }

    render(){
        return (
            <Tabs>
                <TabList className="nav nav-tabs">
                    <Tab selectedClassName="active">
                        <a href="javascript:void(0);">
                            <span className="icon-art">
                                {" Images"}
                            </span>
                        </a>
                    </Tab>
                    <Tab selectedClassName="active">
                        <a href="javascript:void(0);">
                            <span className="icon-play">
                                {" Videos"}
                            </span>
                        </a>
                    </Tab>
                </TabList>
                <div className="content">
                    <TabPanel> 
                        
                        <ImageContent />
                        
                    </TabPanel>
                    <TabPanel>
                        
                        <VideoContent />

                    </TabPanel>
                </div>
            </Tabs>
        )
    }
}