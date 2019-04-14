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
import Participants from './Participants';
import headerStore from '../header/store';
import FeedList from '../profile/feed';

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

                            <Participants 
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