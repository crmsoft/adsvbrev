import React, {Component, Fragment} from 'react';
import {Link} from 'react-router-dom';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import {Modal} from '../Modal/index';
import User from '../profile/friends/partials/friend';

export default class Participants extends Component {

    state = {
        open: false
    }

    closeModal()
    {
        this.setState(() => {
            return {
                open: false
            }
        });
    }

    openModal()
    {
        this.setState(() => {
            return {
                open: true
            }
        }, () => {
            this.props.load(this.props.event.id);
        });
    }

    render()
    {
        const actions = [
            {
                title: `Close`,
                onAction: this.closeModal.bind(this),
                class: `btn-empty`
            }
        ];
        const {event, title} = this.props;


        return (
            <Fragment>
                <div className="header ">
                    <a
                        onClick={this.openModal.bind(this)}
                        href="javascript:void(0)"
                    >
                        <span className="icon icon-friends"></span>
                        <h3>
                            {title ? title:`Participants`} 
                        </h3>
                        <span className="items-count"> {event.total_participant ? `(${event.total_participant})` : ''}</span>
                    </a>
                    <Modal
                        open={this.state.open}
                        onClose={this.closeModal.bind(this)}
                        actions={actions}
                        title={`Participants`}
                    >
                        <Tabs className="mt-2 ml-2">
                            <TabList className="nav nav-tabs">
                                <Tab selectedClassName="active">
                                    <a href="javascript:void(0);">
                                        <span className="icon-info"></span>
                                        <span className="tab-title">
                                            {" Attenders"}
                                        </span>
                                    </a>
                                </Tab>

                                <Tab selectedClassName="active">
                                    <a href="javascript:void(0);">
                                        <span className="icon-picture"></span>
                                        <span className="tab-title">
                                            {" Interested"}
                                        </span>
                                    </a>
                                </Tab>
                            </TabList>
                            <TabPanel> 
                                <div
                                    className="container-fluid mt-3 event-user-list"
                                >
                                    {
                                        event.participants && event.participants
                                        .filter(u => u.type === 'attends')
                                        .map(user => {
                                            return (
                                                <div 
                                                    key={user.username}
                                                    className="user-list-item">
                                                    <Link to={`/gg/${user.username}`} className="d-flex">
                                                        <div className="user-list-ava">
                                                            <img src={`${user.ava}`}/>
                                                        </div>
                                                        <div className="user-list-user">
                                                            <span style={{fontWeight:'bold'}}>{user.full_name}</span>
                                                            <span style={{fontSize:'14px'}}>{user.username}</span>
                                                        </div>
                                                    </Link>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </TabPanel>
                            <TabPanel> 
                                <div
                                    className="container-fluid mt-3 event-user-list"
                                >
                                    {
                                        event.participants && event.participants
                                        .filter(u => u.type === 'interested')
                                        .map(user => {
                                            return (
                                                <div 
                                                    key={user.username}
                                                    className="user-list-item">
                                                    <Link to={`/gg/${user.username}`} className="d-flex">
                                                        <div className="user-list-ava">
                                                            <img src={`${user.ava}`}/>
                                                        </div>
                                                        <div className="user-list-user">
                                                            <span style={{fontWeight:'bold'}}>{user.full_name}</span>
                                                            <span style={{fontSize:'14px'}}>{user.username}</span>
                                                        </div>
                                                    </Link>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </TabPanel>
                        </Tabs>
                    </Modal>
                </div>
                <div className="block-content">
                    <div className="friends">
                    {
                        event.random && event.random.map(friend => <User key={friend.username} friend={friend} />)
                    }
                    </div>
                </div>
            </Fragment>
        )
    }
}