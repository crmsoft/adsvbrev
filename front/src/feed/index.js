import React, {Component} from 'react';
import { StickyContainer, Sticky } from 'react-sticky';

import Menu from '../menu';
import CreatePostComponent from '../post-add';
import List from './List';

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
                                
                                var _style = style.position ? {
                                    ...style,
                                    top: 15
                                } : style;
                                
                                return (
                                    <div style={_style}>
                                        <section className="block">
                                            <GameGroups
                                                style={style} 
                                                store={scheduleStore}
                                            />
                                        </section>
                                        <div className="left-banner p-0 mt-2">
                                            <div className="banner-header">
                                                <h3>Game Groups </h3>
                                                <p>Lol Gamer Community</p>
                                            </div>
                                            <img src="../img/ad-sample.jpg" alt="The Last of us"/>
                                        </div>
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