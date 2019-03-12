import React, {Component} from 'react';
import {connect} from 'react-redux';

import Menu from '../menu/index';
import MediaTabs from '../profile/media-tabs';
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
import Partipicatns from './Participants';
import headerStore from '../header/store';
import FeedList from '../profile/feed';

class EeventProfileComponent extends Component{

    state = {
        user: undefined
    }

    componentDidMount()
    {
        this.props.load(
            this.props.match.params.id
        );

        document.title = `Event: ${this.props.name}`;

        this.setState({
            user: headerStore.getState()
        }) 
    }

    join()
    {
        this.props.join(this.props.id);
    }

    leave()
    {
        this.props.leave(this.props.id);
    }

    render()
    {
        const {description, poster, owner, feed} = this.props;
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
                        leave={this.leave.bind(this)}
                        join={this.join.bind(this)}
                        data={this.props}
                        editor={editor}
                    />
                </nav>

                <div className="d-flex">

                    <Menu />

                    <section className="user-middle">
                        
                        <About 
                            about={description}
                        /> 

                        <section className="user-uploads w-100" id="media-container">
                            
                            <MediaTabs />

                        </section>
                        
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

                            <Partipicatns 
                                event={this.props}
                                load={ () => {
                                    this.props.loadParticipants(this.props.id)
                                }}
                            />              

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