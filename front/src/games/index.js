import React, {Component} from 'react';
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
    leave
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
                        data={data}
                        onJoin={e => this.props.join(id)}
                        onLeave={e => this.props.leave(id)}
                    />
                    
                </nav>

                <div className="d-flex">

                    <Menu />

                    <section className="user-middle">
                        
                        <ReviewFeed />

                        <About 
                            about={data.options}
                        /> 

                        <section className="user-uploads w-100" id="media-container">
                            
                            <MediaTabs 
                                media={data.media}
                                streams={data.streams}
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

                    </section>

                    <aside className="profile-aside">

                        <section className="block">

                            <Vote />             

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
            leave: group => dispatch(leave(group))
        }
    }
)(GamePageComponent);

export default GamePage;