import React, {Component} from 'react';
import {connect} from 'react-redux';

import Menu from '../menu/index';
import Profile from './Profile';
import About from './About';
import CreatePostComponent from '../post-add';
import FeedList from '../profile/feed';
import Participants from '../event/Participants';
import {
    init
} from './store/event';

class GamePageComponent extends Component{

    componentDidMount()
    {
        const page_id = this.props.match.params.id;
        this.props.init(page_id);
    }

    loadGamers( id )
    {
        
    }

    render()
    {
        const poster = `http://35.205.191.229/front/user-default-bg-80.edf85c92.jpg`;
        const description = ``;
        const {id} = this.props.match.params;
        const data = this.props.data;

        return (
            <div>
                <nav className="user-profile game-profile"
                    style={{backgroundImage: `url(${poster})`}}
                >
                    
                    <div className="triangle-right"></div>

                    <Profile 
                        data={data}
                    />
                    
                </nav>

                <div className="d-flex">

                    <Menu />

                    <section className="user-middle">
                        
                        <About 
                            about={description}
                        /> 
                    
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

                            <Participants 
                                title={`Gamers`}
                                event={data}
                                load={ () => {
                                    this.loadGamers(this.props.id)
                                }}
                            />              

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
            init: group => dispatch(init(group))
        }
    }
)(GamePageComponent);

export default GamePage;