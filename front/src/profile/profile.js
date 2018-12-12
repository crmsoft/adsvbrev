import React, { Component } from 'react';
import { connect  } from "react-redux";

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



class ProfileComponent extends Component{

    componentDidMount(){
        this.props.ini();
    }

    render(){
        return (
            <div>
                <nav className="user-profile">
                    
                    <div className="triangle-right"></div>

                    <UserProfle info={this.props.info}/>

                </nav>

                <div className="d-flex">

                    <Menu />

                    <section className="user-middle">

                        <About user={this.props.info} />

                        <section className="user-uploads w-100" id="media-container">
                            
                            <MediaTabs />

                        </section>

                        <section className="user-add-post">
                            <CreatePostComponent />
                        </section>
                        
                        <section className="posts">
                            <FeedList list={this.props.info.feed} />
                        </section>

                    </section>

                    <aside className="profile-aside">

                        <section className="block">

                            <Friends 
                                isGuest={false}
                                list={this.props.info.friends} 
                                total={this.props.totals.friends} 
                            />                    

                        </section>

                        <section className="block">

                            <Groups 
                                isGuest={false}
                                list={this.props.info.groups} 
                                total={this.props.totals.groups} 
                            />                    

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