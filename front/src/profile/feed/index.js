import React, {Component} from 'react';
import PostComponent from './Post';
import axios from 'axios';
import postCreateStore from '../../post-add/redux/store';

/**
 * helper to show message user once 
 */
const getStore = () => {
    
    let data = {
        last: null,
    };

    return function() {
        return {
            set: post_id => {this.last = post_id;},
            get: () => this.last
        };
    }.bind(data)
}

let unRegister = () => {}

export default class FeedList extends Component{

    state = {
        list: []
    }

    componentDidMount()
    {
        unRegister = postCreateStore.subscribe(() => {
            this.setState(state => {
                return {
                    list: [
                        postCreateStore.getState(),
                        ...state.list    
                    ]
                }
            });
        })
    }

    componentWillUnmount()
    {
        unRegister();
    }

    static getDerivedStateFromProps(props, state)
    {   
        if (state.localeStore && (state.list.length === 0 || (props.user !== state.user)))
        {
            return {
                list: props.list,
                user: props.user,
                type: props.type,
                localeStore: getStore()()
            }
        }


        return {
            localeStore: getStore()(),
            user: props.user,
            end: false || state.end
        };
    }

    loadMore()
    {
        
        if (this.state.end)
        {
            return null;
        } // end if

        axios.post(this.state.user ? `/feed/more/${this.state.user}` : `/feed/more`, {
            last: this.state.localeStore.get(),
            type: this.state.type
        }).then(({data}) => {
            this.setState(() => {
                return data.data.length ? {
                    list: [
                        ...this.state.list,
                        ...data.data
                    ]
                } : {
                    end: true
                }
            })
        });
    }

    toggleLike(post_id)
    {
        this.setState(state => {
            return {
                lsit: state.list.map(post => {
                    if (post.id === post_id)
                    {
                        post.likes = !post.likes;
                        if (post.likes)
                        {
                            post.like_count += 1;
                        } else {
                            post.like_count -= 1;
                        }
                    } //end if
                    return post;
                })
            }
        })
    }

    onDelete(post_id)
    {
        this.setState(state => {
            return {
                list: state.list.filter(p => {
                    return p.id !== post_id
                })
            }
        })
    }

    render(){
        const {list, localeStore} = this.state;
        
        return (
            <section className="posts">
                {
                    list.map((item, index) => {
                        localeStore.set(item.id);
                        return (
                            <PostComponent
                                guest={this.props.guest}
                                onDelete={this.onDelete.bind(this)}
                                toggle={this.toggleLike.bind(this)}
                                onEnterViewport={
                                    () => {                                        
                                        (item.id === localeStore.get()) && this.loadMore();
                                    }
                                }
                                key={index} post={item} 
                            />
                        )
                    })
                }
            </section>
        )
    }
}