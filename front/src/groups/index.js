import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';

import RelatedGames from './RelatedGames';
import ForbiddenPage from './403';
import MediaTabs from '../profile/media-tabs';
import Menu from '../menu/index';
import Profile from './Profile';
import About from './About';
import CreatePostComponent from '../post-add';
import FeedList from '../profile/feed';
import Participants from '../event/Participants';
import {
    init,
    join,
    leave
} from './store/event';

class GroupPageComponent extends Component{

    componentDidMount()
    {
        const page_id = this.props.match.params.id;
        this.props.init(page_id);
    }

    componentDidUpdate()
    {
        document.title = `Group: ${this.props.data.name}`;
    }

    loadGamers( id )
    {
        
    }

    render()
    {
        const {id} = this.props.match.params;
        const {data,forbidden} = this.props;
        const poster = data.poster;

        if (forbidden)
        {
            return <ForbiddenPage data={data}/>;
        } // end if

        return (
            <div>
                <nav className="user-profile game-profile"
                    style={{backgroundImage: `url(${poster})`}}
                >

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
                        
                        <Fragment>

                            <About 
                                about={data.description}
                            /> 

                            <section className="user-uploads w-100" id="media-container">
                                
                                <MediaTabs 
                                    media={data.media}
                                    streams={data.streams}
                                />

                            </section>
                        
                            <section className="user-add-post">
                                <CreatePostComponent 
                                    type={`group`}
                                    id={id}
                                />
                            </section>

                            <FeedList 
                                list={data.feed}
                                user={id}
                                type={`group`}
                            />

                        </Fragment>

                    </section>

                    <aside className="profile-aside">

                        <section className="block">

                            <Participants 
                                title={`Participants`}
                                event={data}
                                load={ () => {
                                    this.loadGamers(this.props.id)
                                }}
                            />              

                        </section>

                        <RelatedGames 
                            list={data.related}
                        />

                    </aside>
                
                </div>
            </div>
        )
    }
}

const GroupPage = connect(
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
)(GroupPageComponent);

export default GroupPage;