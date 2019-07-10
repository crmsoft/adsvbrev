import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';

import MediaTabs from '../profile/media-tabs';
import Menu from '../menu/index';
import Profile from './Profile';
import About from './About';
import CreatePostComponent from '../post-add';
import FeedList from '../profile/feed';
import Participants from '../event/Participants';
import {Buy} from './Buy';
import {
    init,
    join,
    leave,
    hide_reviews,
    show_reviews,
    push_review
} from './store/event';
import Vote from './Reviews/Vote';
import ReviewFeed from './Reviews/ReviewFeed';

class GamePageComponent extends Component{

    componentDidMount()
    {
        const page_id = this.props.match.params.id;
        this.props.init(page_id);
    }

    componentDidUpdate()
    {
        document.title = `Game: ${this.props.data.name}`;
    }

    loadGamers( id )
    {
        
    }

    render()
    {
        const {id} = this.props.match.params;
        const data = this.props.data;
        const poster = data.poster;

        return (
            <div>
                <nav className="user-profile game-profile"
                    style={{backgroundImage: `url(${poster})`}}
                >
                    
                    <div className="triangle-right"></div>

                    <Profile 
                        init={() => this.props.init(data.id)}
                        data={data}
                        onJoin={e => this.props.join(id)}
                        onLeave={e => this.props.leave(id)}
                    />
                    
                </nav>

                <div className="d-flex">

                    <Menu />

                    <section className="user-middle">
                        
                        {
                            data.reviews_open ? (
                                <ReviewFeed 
                                    pushReview={({data}) => this.props.push_review(data)}
                                    reviews={data.reviews}
                                    vote={data.votes}
                                    id={id}
                                />        
                            ) : (
                                <Fragment>
                                    <div className="event-schedule">
                                        <div className="row">
                                            <div className="col-md-3">
                                                <div className="event-schedule-left">
                                                    <h3>FEB</h3>
                                                    <div className="event-schedule-number">
                                                        12
                                                    </div>
                                                    <h4>Tournament</h4>
                                                    <h5>Public</h5>
                                                </div>
                                            </div>
                                            <div className="col-md-9">
                                                <div className="event-schedule-right">
                                                    <div className="event-schedule-date" ><span
                                                        className="icon-friends"></span>Sunday, February 24, 2019 at 5 PM – 8 PM</div>
                                                    <div className="event-schedule-date"><span
                                                        className="icon-friends"></span>Via İnternet <a href="www.gamecounter.com">www.gamecounter.com</a>
                                                    </div>
                                                    <div className="event-schedule-buttons">
                                                        <div className="left-button">Interested</div>
                                                        <div className="right-button">Attending</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <About 
                                        about={data.options}
                                    /> 

                                    <section className="user-uploads w-100" id="media-container">
                                        
                                        <MediaTabs 
                                            media={data.media}
                                            streams={data.streams}
                                            user={{username:id, type: 'game'}}
                                        />

                                    </section>
                                
                                    <section className="user-add-post">
                                        <CreatePostComponent 
                                            type={`game`}
                                            id={id}
                                        />
                                    </section>

                                    <section>
                                        <div className="about-event">
                                            <div className="about-event-title">About Event</div>
                                            <div className="about-event-content">
                                                Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
                                                nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat
                                                volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation
                                                ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.
                                                Duis autem vel eum iriure dolor in hendrerit in
                                                Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
                                                nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat
                                                volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation
                                                ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.
                                                Duis autem vel eum iriure dolor in hendrerit in
                                            </div>
                                            <div className="about-event-button">
                                                <div className="about-event-pencil">
                                                    <span className="icon-friends"></span>
                                                </div>
                                            </div>
                                        </div>
                                    </section>

                                    <FeedList 
                                        list={data.feed}
                                        user={id}
                                        type={`game`}
                                    />

                                </Fragment>
                            )
                        }

                    </section>

                    <aside className="profile-aside">

                        <section className="block">

                            <Vote 
                                showReviews={can_add_review => this.props.show_reviews(can_add_review)}
                                reviews={data.reviews.slice(0,2)}
                                vote={data.votes}
                                id={id}
                            />             

                        </section>

                        <section className="block">

                            <Participants 
                                title={`Gamers`}
                                event={data}
                                load={ () => {
                                    this.loadGamers(this.props.id)
                                }}
                            />              

                        </section>

                        <Buy 
                            data={data}
                        />

                        <section className="block">
                            <div className="event-sugested-friend">
                                <div className="event-sugested-friend-header">
                                    Sugested Friends
                                </div>
                                <div className="event-sugested-friend-content">
                                    <div className="event-sugested-friend-box">
                                        <div className="sugested-friend-img-content">
                                        <div className="sugested-friend-img">
                                            <img src="../img/kurukafa.png" alt=""/>
                                        </div>
                                        </div>
                                        <div className="sugested-friend-name">
                                            <small className="name">george Bovie</small>
                                            <small>george44</small>
                                        </div>
                                        <div className="sugested-friend-button">
                                            invite&nbsp;>
                                        </div>
                                    </div>
                                    <div className="event-sugested-friend-box">
                                        <div className="sugested-friend-img-content">
                                            <div className="sugested-friend-img">

                                            </div>
                                        </div>
                                        <div className="sugested-friend-name">
                                            <small className="name">george Bovie</small>
                                            <small>george44</small>
                                        </div>
                                        <div className="sugested-friend-button">
                                            invite&nbsp;>
                                        </div>
                                    </div>
                                    <div className="event-sugested-friend-box">
                                        <div className="sugested-friend-img-content">
                                            <div className="sugested-friend-img">

                                            </div>
                                        </div>
                                        <div className="sugested-friend-name">
                                            <small className="name">george Bovie</small>
                                            <small>george44</small>
                                        </div>
                                        <div className="sugested-friend-button">
                                            invite&nbsp;>
                                        </div>
                                    </div>
                                </div>
                                <div class="event-sugested-all">
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
                                                <img src="../img/kurukafa.png" alt=""/>
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
                                <div className="related-events-seemore">
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

const GamePage = connect(
    store => {
        return store;
    },
    dispatch => {
        return {
            init: group => dispatch(init(group)),
            join: group => dispatch(join(group)),
            leave: group => dispatch(leave(group)),
            show_reviews: can_add_review => dispatch(show_reviews(can_add_review)),
            hide_reviews: () => dispatch(hide_reviews()),
            push_review: review => dispatch(push_review(review))
        }
    }
)(GamePageComponent);

export default GamePage;