import React, {Component, Fragment} from 'react';

import Menu from '../menu';
import CreatePostComponent from '../post-add';
import List from './List';

export default class Feed extends Component{
    render()
    {
        return (
            <div className="d-flex">

                <Menu 
                    style={{
                        paddingTop: 0
                    }}
                />
                
                <div className="user-middle">

                    <section className="user-add-post">
                        <CreatePostComponent 
                            type="feed"
                        />
                    </section>

                    <List />
                            
                </div>

                <div className="profile-aside">

                </div>
            </div>
        )
    }
}