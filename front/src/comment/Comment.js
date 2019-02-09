import React, {Component} from 'react';
import store from '../profile/fetch/store';
import {
    COMMENT_LIKED
} from '../profile/fetch/actions';
import axios from 'axios';
import {
    placeEmoji
} from '../utils';
import {
    Link
} from 'react-router-dom';


export default class Comment extends Component{

    /**
     * user click like btn
     */
    toggleLike()
    {
        const id = this.props.comment.id;

        axios.post(`/comment/like/${id}`)
        .then(response => {
            store.dispatch({
                type: COMMENT_LIKED, 
                data: { 
                    comment: id, 
                    post: this.props.post 
                }
            });
        })
    }

    render()
    {
        const {comment} = this.props;
        const {user} = comment;

        return (
            <div className={comment.parent ? `comment reply` : `comment`}>
                <div className="comment-user">
                    <div className="comment-user-ava">
                        <img src={user.ava} alt={user.full_name} />
                    </div>
                </div>
                <div className="comment-body">
                    <p>
                        <Link to={`/gg/${user.username}`} >
                            <strong>{user.full_name}</strong>
                        </Link>
                        {placeEmoji(comment.contnet)}
                    </p>
                    <div>
                        {
                            comment.media.map(media => {
                                return <img key={media.full_path} src={media.full_path} />
                            })
                        }
                    </div>
                    <div className="w-100 ">
                        <div className="comment-actions">
                            <span 
                                className={comment.likes ? 'active':''}
                                onClick={this.toggleLike.bind(this)}
                            >
                                <span className="icon-heart"></span>
                                <span className="icon-heart-empty"></span>
                            </span>
                            <span >{comment.like_count | 0}</span>
                            <span onClick={ e => { this.props.replyTo(user, comment.id); }} >reply</span>
                        </div>
                    </div>
                </div>
                <div className="comment-time">
                    {comment.created_at}
                </div>
                <div className="comment-dot">
                    ...
                </div>
            </div>
        )
    }
}