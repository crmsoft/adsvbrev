import React, { Component } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import FriendsList from './friends-list';
import FollowerList from './follower-list';
import { Provider } from 'react-redux';
import store from '../stores/index';

export default class FriendsAndFollowersContent extends Component{

    render(){
        return (
            <Tabs>
                <TabList className="nav nav-tabs">
                    <Tab selectedClassName="active">
                        <a href="javascript:void(0);">
                            <span className="icon-friends"></span>
                            <span className="tab-title">
                                {" Friends"}
                            </span>
                        </a>
                    </Tab>
                    <Tab selectedClassName="active">
                        <a href="javascript:void(0);">
                            <span className="icon-add-dude"></span>
                            <span className="tab-title">
                                {" Followers"}
                            </span>
                        </a>
                    </Tab>
                </TabList>
                <div className="content">
                    <TabPanel> 

                        
                        <Provider store={store}>
                            <FriendsList isGuest={this.props.isGuest} user={this.props.user} />                       
                        </Provider>       
                        
                    </TabPanel>
                    <TabPanel>
                        
                        <Provider store={store}>
                            <FollowerList isGuest={this.props.isGuest} user={this.props.user} />
                        </Provider>

                    </TabPanel>
                </div>
            </Tabs>
        )
    }

}