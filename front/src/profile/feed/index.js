import React, {Component} from 'react';
import Post from './Post';

export default class FeedList extends Component{

    render(){
        return (
            <section className="posts">
                {
                    this.props.list.map((item, index) => {
                        return (
                            <Post key={index} post={item} />
                        )
                    })
                }
            </section>
        )
    }
}