import React, {Component} from 'react';
import { connect } from "react-redux";
import { StickyContainer, Sticky } from 'react-sticky';

import Friends from '../friends/index';
import MediaTabs from '../media-tabs/index';
import UserProfle from '../profile-main';
import Menu from '../../menu/index';
import Groups from '../groups/index';
import FeedList from '../feed';
import {Games} from '../games/index';

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

        document.title = this.props.data.profile.user.full_name;
        
        const {
            friends,
            groups,
            games,
            totals,
            feed,
            profile
        } = this.props.data;

        return (
            <div>
                <nav className="user-profile" style={ profile.cover ? {backgroundImage:`url(${profile.cover})`} : {}}> 
                    
                    <div className="triangle-right"></div>

                    <UserProfle info={this.props.data} guest={true}/>

                </nav>

                <div className="d-flex">

                    <Menu />

                    <section className="user-middle">
                        
                        <About user={this.props.data} isGuest={true} />

                        <section className="user-uploads w-100" id="media-container">
                            
                            <MediaTabs 
                                media={this.props.data.media}
                                totalImage={totals.media}
                            />

                        </section>

                        <section className="posts">
                            <FeedList list={feed} user={profile.user.username} guest={true} />
                        </section>

                    </section>

                    <StickyContainer className="profile-aside">
                        <Sticky
                            disableHardwareAcceleration
                            topOffset={55}
                        >
                            { ({style}) => {
                                var _style = style.position ? {
                                    ...style,
                                    top: 15
                                } : style;
                                return (
                                    <div style={_style}>

                                        <section className="block">

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

                                        <section className="block">

                                            <Games 
                                                isGuest={false}
                                                list={games} 
                                                total={totals.games} 
                                            />                      

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