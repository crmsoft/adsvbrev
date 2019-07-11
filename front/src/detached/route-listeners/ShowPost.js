import React, {Component} from 'react';

import {Modal} from '../../Modal';
import axios from 'axios';
import Post from '../../profile/feed/Post';
import {Loading} from '../../general/Loading';


export default class ShowPost extends Component {

    state = {
        open: true,
        processing: true
    }

    componentDidMount()
    {
        axios.get(`/p/${this.props.post_id}`)
        .then(({data}) => {
            this.setState(() => ({data:data.data, processing:false}))
        })
    }

    removeHash () { 
        this.setState(() => {
            return {
                open: false
            }
        }, () => {
            history.pushState(
                "", 
                document.title, 
                window.location.pathname + window.location.search
            );
        }); 
    }

    /**
     * Toggle post like
     * 
     * @return void
     */
    toggle()
    {
        this.setState(state => {
            const post = {...state.data};
            post.likes = !post.likes;
            return {
                data: post
            }
        })
    }

    /**
     * Toggle post share
     * 
     * @return void
     */
    toggleShare()
    {
        this.setState(state => {
            const post = {...state.data};
            post.shares = !post.shares;
            return {
                data: post
            }
        })
    }

    render()
    {
        const {open,processing,data} = this.state;

        return (
                    <Modal
                        overlayStyle={{overflowY:'auto'}}
                        contentStyle={{maxHeight:'inherit'}}
                        open={open}
                        onClose={this.removeHash.bind(this)}
                        processing={processing}
                    >
                        <div>                   
                            {data ? <Post
                                modal={true} 
                                key={Math.random()}
                                toggle={this.toggle.bind(this)}
                                toggleShare={this.toggleShare.bind(this)}
                                post={data}
                            /> : <Loading />}
                        </div>
                    </Modal>
        )
    }
}