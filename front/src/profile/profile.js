import React, { Component } from 'react';
import { connect, Provider  } from "react-redux";
import { StickyContainer, Sticky } from 'react-sticky';

import FeedList from './feed/index';
import Friends from './friends/index';
import Groups from './groups/index';
import {Games} from './games/index';
import MediaTabs from './media-tabs/index';
import UserProfile from './profile-main';
import Menu from '../menu/index';
import {
    fetchProfile
} from './fetch/events';
import CreatePostComponent from '../post-add/index';
import About from './about';
import ProfileSchedule from './schedule';
import scheduleStore from './schedule/store';

import Poster from './ava/Poster';


class ProfileComponent extends Component{

    componentDidMount(){
        this.props.ini();
    }

    render(){

        document.title = this.props.data.profile.user.full_name;

        const {
                feed, 
                friends, 
                groups,
                games,
                totals,
                profile
            } = this.props.data;
        return (
            <div>
                <nav className="user-profile" style={ profile.cover ? {backgroundImage:`url(${profile.cover})`} : {}}>

                    <Poster 
                        src={this.props.data}
                    />
                    
                    <div className="triangle-right"></div>

                    <UserProfile info={this.props.data}/>

                </nav>

                <div className="d-flex">

                    <Menu />

                    <section className="user-middle">

                        <About user={this.props.data} />

                        <section className="user-uploads w-100" id="media-container">
                            
                            <MediaTabs 
                                media={this.props.data.media}
                            />

                        </section>

                        <section className="user-add-post">
                            <CreatePostComponent 
                                type={`feed`}
                            />
                        </section>
                        
                        <FeedList list={feed} />

                    </section>

                    <StickyContainer className="profile-aside">
                        <Sticky
                            disableHardwareAcceleration
                            topOffset={350}
                        >
                            { ({style, isSticky}) => {
                                return (
                                    <div style={style}>
                                        <section className={isSticky ? "block friends d-none" : "block friends"}>

                                            <Friends 
                                                isGuest={false}
                                                list={friends} 
                                                total={totals.friends} 
                                            />                    

                                        </section>

                                        <section className={isSticky ? "block friends d-none" : "block friends"}>

                                            <Groups 
                                                isGuest={false}
                                                list={groups} 
                                                total={totals.groups} 
                                            />                    

                                        </section>

                                        <section className="block">

                                            <Games 
                                                isGuest={false}
                                                list={games} 
                                                total={totals.games} 
                                            />                    

                                        </section>

                                        <section className="block">

                                            <Provider store={scheduleStore}>
                                                <ProfileSchedule 
                                                    isGuest={false}
                                                    list={groups} 
                                                    total={totals.groups} 
                                                />                    
                                            </Provider>
                                        </section>   
                                    </div>
                                )
                            } }
                            
                        </Sticky>

                    </StickyContainer>

                </div>
            </div>
        )
    }
}

const Profile = connect(
    state => {
        return {
            ...state
        };
    },
    dispatch => {
        return {
            ini: () => { dispatch(fetchProfile()) }
        }
    }
)(ProfileComponent);

export default Profile;