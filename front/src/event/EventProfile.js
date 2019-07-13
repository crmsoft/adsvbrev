import React, {Component} from 'react';
import {connect} from 'react-redux';

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

let unlisten = () => {}

class EeventProfileComponent extends Component{

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
        this.props.join(this.props.id);
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
        const {description, poster, owner, feed, total_participant} = this.props;
        const loggedIn = this.state.user;
        let editor = false;

        if (owner && loggedIn)
        {
            editor = owner.username === loggedIn.data.username;
        } // end if
        
        return (
            <div>
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
                                title={`Joined`}
                                event={this.props}
                                load={ () => {
                                    this.props.loadParticipants(this.props.id)
                                }}
                            />              

                        </section>

                        <section className="block">
                            <div className="event-suggested-friend">
                                <div className="event-suggested-friend-header">
                                    Suggested Friends
                                </div>
                                <div className="event-suggested-friend-content">
                                    <div className="event-suggested-friend-box">
                                        <div className="suggested-friend-img-content">
                                        <div className="suggested-friend-img">
                                            <img src="../img/default_ava.png" alt=""/>
                                        </div>
                                        </div>
                                        <div className="suggested-friend-name">
                                            <small className="name">george Bovie</small>
                                            <small>george44</small>
                                        </div>
                                        <div className="suggested-friend-button">
                                            invite&nbsp;>
                                        </div>
                                    </div>
                                    <div className="event-suggested-friend-box">
                                        <div className="suggested-friend-img-content">
                                            <div className="suggested-friend-img">
                                                <img src="../img/default_ava.png" alt=""/>
                                            </div>
                                        </div>
                                        <div className="suggested-friend-name">
                                            <small className="name">george Bovie</small>
                                            <small>george44</small>
                                        </div>
                                        <div className="suggested-friend-button">
                                            invite&nbsp;>
                                        </div>
                                    </div>
                                    <div className="event-suggested-friend-box">
                                        <div className="suggested-friend-img-content">
                                            <div className="suggested-friend-img">
                                                <img src="../img/default_ava.png" alt=""/>
                                            </div>
                                        </div>
                                        <div className="suggested-friend-name">
                                            <small className="name">george Bovie</small>
                                            <small>george44</small>
                                        </div>
                                        <div className="suggested-friend-button">
                                            invite&nbsp;>
                                        </div>
                                    </div>
                                </div>
                                <div className="event-suggested-all">
                                    <a href="#">All Friends</a>
                                </div>
                            </div>
                        </section>

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

const EeventProfile = connect(
    state => {
        return {
            ...state
        }
    },
    dispatch => {
        return {
            load: event => dispatch(load(event)),
            join: event => dispatch(join(event)),
            leave: event => dispatch(leave(event)),
            loadParticipants: event => dispatch(loadParticipants(event)),
            pushPost: post => dispatch(postAdded(post))
        }
    }
)(EeventProfileComponent);

export default EeventProfile;