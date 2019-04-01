import React, {Component} from 'react';

import Menu from '../menu/index';
import Profile from './Profile';
import About from './About';
import CreatePostComponent from '../post-add';
import FeedList from '../profile/feed';
import Partipicatns from '../event/Participants';

export default class GamePage extends Component{

    loadGamers()
    {

    }

    render()
    {
        const poster = `http://35.205.191.229/front/user-default-bg-80.edf85c92.jpg`;
        const description = ``;

        return (
            <div>
                <nav className="user-profile game-profile"
                    style={{backgroundImage: `url(${poster})`}}
                >
                    
                    <div className="triangle-right"></div>

                    <Profile />
                    
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
                                id={this.props.id}
                            />
                        </section>

                        <FeedList 
                            list={[]}
                            user={85}
                            type={`game`}
                        />

                    </section>

                    <aside className="profile-aside">

                        <section className="block">

                            <Partipicatns 
                                title={`Gamers`}
                                event={this.props}
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