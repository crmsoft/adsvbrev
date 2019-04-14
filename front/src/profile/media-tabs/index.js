import React, { Component } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import ImageContent from './image-content';
import VideoContent from './video-cotent';
import {StreamList} from './StreamList';

const streamTabStyle = {
    background: `white`,
    borderRadius: `50%`,
    height: `13px`,
    width: `13px`,
    display: `inline-block`,
    marginTop: `3px`
}

export default class MediaTabs extends Component {

    constructor(props){
        super(props);

        this.saveChanges = this.saveChanges.bind(this);
    }

    saveChanges(data){

    }

    render(){

        const {streams, media} = this.props;

        return (
            <Tabs>
                <TabList className="nav nav-tabs">
                    {
                        streams && streams.length ? (
                            <Tab selectedClassName="active">
                                <a href="javascript:void(0);">
                                    <span className="icon-streams" style={streamTabStyle}></span>
                                    {" Streams"}
                                </a>
                            </Tab>
                        ) : null
                    }
                    <Tab selectedClassName="active">
                        <a href="javascript:void(0);">
                            <span className="icon-picture"></span>
                            {" Images"}
                        </a>
                    </Tab>
                    <Tab selectedClassName="active">
                        <a href="javascript:void(0);">
                            <span className="icon-play"></span>
                            {" Videos"}
                        </a>
                    </Tab>
                </TabList>
                <div className="content">
                    {
                        streams && streams.length ? (
                            <TabPanel> 
                                <StreamList streams={streams} />
                            </TabPanel>
                        ) : null   
                    }
                    <TabPanel> 
                        
                        <ImageContent 
                            media={media}
                        />
                        
                    </TabPanel>
                    <TabPanel>
                        
                        <VideoContent />

                    </TabPanel>
                </div>
            </Tabs>
        )
    }
}