import React, {Component} from 'react';
import Comment from './Comment';
import headerStore from '../header/store';
import axios from 'axios';

let unListen = () => {};

const pushNewComment = (comments, newComment) => {
    
    if(newComment.parent)
    {

       var found = comments.filter(c => c.id === newComment.parent);

       if(found.length)
       {
           let index = comments.indexOf(found.pop());
           comments[index].subs.push(newComment);
       }

    } else {
        comments.push(newComment);    
    } // end if

    return comments;
}

export default class Comments extends Component {
    
    state = {
        moreLoaded: 0,
        comments: [],
        hasMore: false,
        firstRender: false,
        user: {}
    }

    componentDidMount()
    {
        const user = headerStore.getState();
        
        if( !user || !user.data ){
            unListen = headerStore.subscribe(() => {
                const user = headerStore.getState();
                
                if(user.username)
                {
                    unListen();
                    this.setState(() => {
                        return {
                            user: user.data
                        }
                    });
                }
            });
        } else {
            this.setState(() => {
                return {
                    user: user.data
                }
            });
        }
    }

    componentWillUnmount()
    {
        unListen();
    }

    static getDerivedStateFromProps(nextProps, prevState)
    {
        
        if (!prevState.firstRender)
        {
            const {comments} = nextProps;

            const hasMore = comments.length > 3;

            const comments_ = comments.length === 0 ? (nextProps.push ? [nextProps.push] : []) : comments;

            return {
                comments: hasMore ? comments.slice(1,4) : comments_,
                hasMore: hasMore,
                post: nextProps.post,
                firstRender: true
            }
        } // end if

        if (nextProps.push)
        {
            
            const comment = nextProps.push;
            
            // if in sub tree, and push for main tree
            if(nextProps.replies && !comment.parent)
            {
                return null;
            }
            
            
            let added = prevState.comments.filter(c => {
                return ( c.id === comment.id );
            });

            if (added.length === 0)
            {
                return {
                    comments: pushNewComment(prevState.comments, comment)
                }
            }
        } // end if

        return {
            replies: nextProps.replies
        };
    }

    toggleLike( comment_id )
    {
        this.setState(state => {
            return {
                comments: state.comments.map(c => {
                    if (c.id === comment_id)
                    {
                        c.likes = !c.likes;
                        if (c.likes)
                        {
                            c.like_count += 1;
                        } else {
                            c.like_count -= 1;
                        } // end if
                    } // end if

                    return c;
                })
            }
        });        
    }

    onCommentDelete(comment_id)
    {
        this.setState(state => {
            return {
                comments: state.comments.filter(c => c.id !== comment_id)
            }
        });
    }

    loadMore()
    {
        let {
            post,
            comments,
            replies
        } = this.state;
        
        let last = comments[0];

        axios.post( replies ? `/comment/more/${post}/${replies}` : `/comment/more/${post}`, {
            last: last.id
        })
        .then(({data}) => {            
            this.setState(state => {
                return {
                    comments: [
                        ...(data.data.length === 4 ? data.data.slice(0,3) : data.data),
                        ...state.comments
                    ],
                    hasMore: data.data.length === 4
                }
            })
        })
        
    }

    render()
    {
        
        let {comments, hasMore} = this.state; 
              

        if(comments.length === 0){ return null; }
        
        return (
            <div className="comments">
                
                {
                    hasMore ? (
                        <div className="d-flex pt-3">
                            <div className="all-comments">
                                <a 
                                    href="javascript:void(0)"
                                    onClick={
                                        this.loadMore.bind(this)
                                    }
                                >All Comments</a>
                            </div>
                        </div>       
                    ) : null
                }

                {
                    comments.map(comment => {

                        if (comment.subs.length === 0) {
                            return <Comment 
                                    user={this.state.user}
                                    onDelete={this.onCommentDelete.bind(this)}
                                    toggle={this.toggleLike.bind(this)}
                                    replyTo={this.props.replyTo}  
                                    comment={comment} 
                                    key={comment.id} 
                                />
                        }
                        

                        return [
                            <Comment 
                                    user={this.state.user}
                                    onDelete={this.onCommentDelete.bind(this)}
                                    toggle={this.toggleLike.bind(this)}
                                    replyTo={this.props.replyTo}  
                                    comment={comment} 
                                    key={comment.id} 
                                />
                        ].concat(<Comments 
                            replies={comment.id}
                            key={`${this.props.post}_sub_comments`}
                            push={this.props.push}
                            replyTo={this.props.replyTo}
                            post={this.props.post} 
                            comments={comment.subs}
                        />)
                    })
                }
            </div>
        )
    }
}
