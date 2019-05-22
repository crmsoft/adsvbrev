import React, {Component, Fragment} from 'react';
import { StickyContainer, Sticky } from 'react-sticky';

import Menu from '../menu';
import CreatePostComponent from '../post-add';
import List from './List';

import ProfileSchedule from '../profile/schedule';
import scheduleStore from '../profile/schedule/store';
import GameGroups from './GameGroups';

export default class Feed extends Component{
    render()
    {
        return (
            <div className="d-flex page-feed">

                <Menu 
                    style={{
                        paddingTop: 0
                    }}
                />
                
                <div className="user-middle">

                    <section className="user-add-post">
                        <CreatePostComponent 
                            type="feed"
                        />
                    </section>

                    <List />
                            
                </div>

                <StickyContainer className="profile-aside">
                    <Sticky
                        topOffset={55}
                    >
                        {
                            ({style}) => {
                                
                                style.position && (style.top = 15);
                                
                                return (
                                    <div style={style}>
                                        <section className="block">
                                            <GameGroups
                                                style={style} 
                                                store={scheduleStore}
                                            />
                                        </section>
                                        <section className="block">
                                            <ProfileSchedule 
                                                store={scheduleStore}
                                            />
                                        </section>
                                    </div>
                                )
                            }
                        }
                    </Sticky>
                </StickyContainer>
            </div>
        )
    }
}