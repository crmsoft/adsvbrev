import React, {Component} from 'react';
import axios from 'axios';
import FeedList from '../profile/feed/index';

export default class List extends Component{

    state = {
        list: []
    }

    componentDidMount()
    {
        axios.get('feed/index')
        .then(({data}) => {
            this.setState({
                list: data.data
            })
        })
    }

    render()
    {
        const {list} = this.state;

        return (
            <FeedList 
                list={list}
                url={'/feed/more'}
            />
        );
    }

}