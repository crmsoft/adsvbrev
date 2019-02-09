import React, {Component} from 'react';
import Comment from './Comment';

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
        hasMore: false
    }

    static getDerivedStateFromProps(nextProps, prevState)
    {
        
        if (prevState.comments.length === 0)
        {
            const {comments} = nextProps;

            const hasMore = comments.length > 3;

            const comments_ = comments.length === 0 ? (nextProps.push ? [nextProps.push] : []) : comments;

            return {
                comments: hasMore ? comments.slice(1,4) : comments_,
                hasMore: hasMore,
                post: nextProps.post
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

        return null;
    }


    render()
    {
        let {comments, post} = this.state;

        if(comments.length === 0){ return null; }
        
        return (
            <div className="comments">
                
                {
                    this.state.hasMore ? (
                        <div className="d-flex pt-3">
                            <div className="all-comments">
                                <a href="javascript:void(0)">All Comments</a>
                            </div>
                        </div>       
                    ) : null
                }

                {
                    comments.map(comment => {

                        if (comment.subs.length === 0) {
                            return <Comment 
                                    replyTo={this.props.replyTo}  
                                    post={post} 
                                    comment={comment} 
                                    key={comment.id} 
                                />
                        }
                        

                        return [
                            <Comment 
                                    replyTo={this.props.replyTo}  
                                    post={post} 
                                    comment={comment} 
                                    key={comment.id} 
                                />
                        ].concat(<Comments 
                            replies={true}
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
