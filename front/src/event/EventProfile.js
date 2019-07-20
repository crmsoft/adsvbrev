import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

import Menu from '../menu/index';
import {
    load,
    join,
    leave,
    postAdded,
    loadParticipants
} from './redux/event';
import CreatePostComponent from '../post-add';
import About from './About';
import Profile from './Profile';
import Participants from './Participants';
import headerStore from '../header/store';
import FeedList from '../profile/feed';
import Actions from './Actions';
import SuggestedParticipants from './SuggestedParticipants';

let unlisten = () => {}

class EventProfileComponent extends Component{

    state = {
        user: undefined
    }

    componentDidUpdate()
    {
        if (this.props.name)
        {
            document.title = `Event: ${this.props.name}`;
        } else {
            document.title = `Loading...`;
        }
    }

    componentDidMount()
    {
        this.props.load(
            this.props.match.params.id
        );
        
        const user = headerStore.getState();

        if (user.data.username)
        {
            this.setState({
                user: headerStore.getState() 
            });
        } else {
            unlisten = headerStore.subscribe(() => {
                this.setState({
                    user: headerStore.getState() 
                });
            });
        } // end if
    }

    join()
    {
        !this.props.user_participant && this.props.join(this.props.id);
    }

    interested()
    {
        !this.props.user_participant && this.props.join(this.props.id, 'interested');
    }

    leave()
    {
        this.props.leave(this.props.id);
    }

    componentWillUnmount()
    {
        unlisten();
    }

    render()
    {
        const {description, denied, poster, owner, feed, suggested, is_private} = this.props;
        const loggedIn = this.state.user;
        let editor = false;

        if (owner && loggedIn)
        {
            editor = owner.username === loggedIn.data.username;
        } // end if
        
        return (
            <div className="event-page">
                {/* check if user has privilege to see this page */}
                {
                    denied ? <Redirect to="/" /> : null
                }
                <nav className="user-profile event-profile"
                    style={{backgroundImage: `url(${poster})`}}
                >
                    
                    <div className="triangle-right"></div>

                    <Profile 
                        data={this.props}
                        editor={editor}
                    />
                    
                </nav>

                <div className="d-flex">

                    <Menu />

                    <section className="user-middle">
                        
                        <Actions 
                            onLeave={this.leave.bind(this)}
                            onJoin={this.join.bind(this)}
                            onInterested={this.interested.bind(this)}
                            onUpdate={e => this.props.load(this.props.id)}
                            data={this.props}
                        />

                        <About 
                            about={description}
                        /> 
                        
                        <section className="user-add-post">
                            <CreatePostComponent 
                                type={`event`}
                                id={this.props.id}
                            />
                        </section>


                        <FeedList 
                            list={feed ? feed:[]}
                            user={this.props.id}
                            type={`event`}
                        />

                    </section>

                    <aside className="profile-aside">

                        <section className="block" id="section-friends">

                            <Participants 
                                page={'event'}
                                title={`Joined`}
                                event={this.props}
                                load={ () => {
                                    this.props.loadParticipants(this.props.id)
                                }}
                            />              

                        </section>

                        {
                            (suggested ? suggested : []).length ? (
                                <section className="block">
                                    <SuggestedParticipants 
                                        list={suggested}
                                        event={this.props.id}
                                    />
                                </section>
                            ) : null
                        }

                        <section className="block">
                            <div className="related-events">
                                <div className="related-events-header">
                                    related events
                                </div>
                                <div className="related-events-content">
                                    <div className="related-events-box">
                                        <div className="related-events-img-content">
                                            <div className="related-events-img">

                                            </div>
                                        </div>
                                        <div className="related-events-name">
                                            <small className="name">LEAGUE OF LEGENDS
                                                INTERNATIONAL WORLD CUP.</small>
                                            <small >Sunday, February 24, 2019 at ...</small>
                                            <small>122 Guests <a href="#">Interested | Attending</a></small>
                                        </div>
                                    </div>
                                    <div className="related-events-box">
                                        <div className="related-events-img-content">
                                            <div className="related-events-img">

                                            </div>
                                        </div>
                                        <div className="related-events-name">
                                            <small className="name">LEAGUE OF LEGENDS
                                                INTERNATIONAL WORLD CUP.</small>
                                            <small >Sunday, February 24, 2019 at ...</small>
                                            <small>122 Guests <a href="#">Interested | Attending</a></small>
                                        </div>
                                    </div>
                                    <div className="related-events-box">
                                        <div className="related-events-img-content">
                                            <div className="related-events-img">

                                            </div>
                                        </div>
                                        <div className="related-events-name">
                                            <small className="name">LEAGUE OF LEGENDS
                                                INTERNATIONAL WORLD CUP.</small>
                                            <small >Sunday, February 24, 2019 at ...</small>
                                            <small>122 Guests <a href="#">Interested | Attending</a></small>
                                        </div>
                                    </div>
                                </div>
                                <div className="related-events-see-more">
                                    <a href="#">See More</a>
                                </div>
                            </div>
                        </section>

                    </aside>

                </div>
            </div>
        )
    }
}

const EventProfile = connect(
    state => {
        return {
            ...state
        }
    },
    dispatch => {
        return {
            load: event => dispatch(load(event)),
            join: (event, type) => dispatch(join(event,type)),
            leave: event => dispatch(leave(event)),
            loadParticipants: event => dispatch(loadParticipants(event)),
            pushPost: post => dispatch(postAdded(post))
        }
    }
)(EventProfileComponent);

export default EventProfile;