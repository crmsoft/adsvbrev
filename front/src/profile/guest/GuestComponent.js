import React, {Component} from 'react';
import { connect } from "react-redux";

import Friends from '../friends/index';
import MediaTabs from '../media-tabs/index';
import UserProfle from '../profile-main';
import Menu from '../../menu/index';
import Groups from '../groups/index';

import {
    fetchGamerProfile
} from '../fetch/events';

class Guest extends Component{

    componentDidMount(){
        this.props.init(this.props.match.params.id);
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

                        <section className="user-uploads w-100" id="media-container">
                            
                            <MediaTabs />

                        </section>

                    </section>

                    <aside className="profile-aside">

                        <section className="block" id="section-friends">

                            <Friends 
                                isGuest={true}
                                user={this.props.info.profile.user.username} 
                                list={this.props.info.friends} total={this.props.totals.friends} 
                            />                    

                        </section>

                        <section className="block">

                            <Groups 
                                isGuest={true}
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

const GuestComponent = connect(
    state => {
        return state;
    },
    dispatch => {
        return {
            init: username => dispatch(fetchGamerProfile(username))
        }
    }
)(Guest)

export default GuestComponent;