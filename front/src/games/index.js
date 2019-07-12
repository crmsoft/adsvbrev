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
    push_review,
    all_gamers,
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
                                load={id => {
                                    (data.random.length === 6) && this.props.all_gamers(id)
                                }}
                            />              

                        </section>

                        <Buy 
                            data={data}
                        />

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
            push_review: review => dispatch(push_review(review)),
            all_gamers: group => dispatch(all_gamers(group))
        }
    }
)(GamePageComponent);

export default GamePage;