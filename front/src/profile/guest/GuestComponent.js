import React, {Component} from 'react';
import { connect } from "react-redux";

import Friends from '../friends/index';
import MediaTabs from '../media-tabs/index';
import UserProfle from '../profile-main';
import Menu from '../../menu/index';
import Groups from '../groups/index';
import FeedList from '../feed';

import {
    fetchGamerProfile
} from '../fetch/events';

import About from '../about';

class Guest extends Component{

    componentDidMount(){
        this.props.init(this.props.match.params.id);
    }

    componentDidUpdate()
    {
        if( (this.props.match.params.id !== this.props.data.profile.user.username) 
                && !this.props.fetching)
        {
            this.props.init(this.props.match.params.id);
        } // end if
    }

    render(){
        const {
            friends,
            groups,
            totals,
            feed,
            profile
        } = this.props.data;

        return (
            <div>
                <nav className="user-profile">
                    
                    <div className="triangle-right"></div>

                    <UserProfle info={this.props.data} guest={true}/>

                </nav>

                <div className="d-flex">

                    <Menu />

                    <section className="user-middle">
                        
                        <About user={this.props.data} isGuest={true} />

                        <section className="user-uploads w-100" id="media-container">
                            
                            <MediaTabs />

                        </section>

                        <section className="posts">
                            <FeedList list={feed} user={profile.user.username} guest={true} />
                        </section>

                    </section>

                    <aside className="profile-aside">

                        <section className="block" id="section-friends">

                            <Friends 
                                isGuest={true}
                                user={profile.user.username} 
                                list={friends} 
                                total={totals.friends} 
                            />                    

                        </section>

                        <section className="block">

                            <Groups 
                                isGuest={true}
                                list={groups} 
                                total={totals.groups} 
                            />                    

                        </section>

                    </aside>

                </div>
            </div>
        )
    }
}

const GuestComponent = connect(
    state => {
        return {
            ...state
        };
    },
    dispatch => {
        return {
            init: username => dispatch(fetchGamerProfile(username))
        }
    }
)(Guest)

export default GuestComponent;