import React, { Component } from 'react';
import { connect, Provider  } from "react-redux";

import FeedList from './feed/index';
import Friends from './friends/index';
import Groups from './groups/index';
import MediaTabs from './media-tabs/index';
import UserProfle from './profile-main';
import Menu from '../menu/index';
import {
    fetchProfile
} from './fetch/events';
import CreatePostComponent from '../post-add/index';
import About from './about';
import ProfileSchedule from './schedule';
import scheduleStore from './schedule/store';




class ProfileComponent extends Component{

    componentDidMount(){
        this.props.ini();
    }

    render(){
        const {
                feed, 
                friends, 
                groups,
                totals
            } = this.props.data;
        return (
            <div>
                <nav className="user-profile">
                    
                    <div className="triangle-right"></div>

                    <UserProfle info={this.props.data}/>

                </nav>

                <div className="d-flex">

                    <Menu />

                    <section className="user-middle">

                        <About user={this.props.data} />

                        <section className="user-uploads w-100" id="media-container">
                            
                            <MediaTabs />

                        </section>

                        <section className="user-add-post">
                            <CreatePostComponent />
                        </section>
                        
                        <FeedList list={feed} />

                    </section>

                    <aside className="profile-aside">

                        <section className="block">

                            <Friends 
                                isGuest={false}
                                list={friends} 
                                total={totals.friends} 
                            />                    

                        </section>

                        <section className="block">

                            <Groups 
                                isGuest={false}
                                list={groups} 
                                total={totals.groups} 
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

                    </aside>

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