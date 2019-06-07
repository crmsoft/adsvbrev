import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

import {
    placeEmoji
} from '../../utils';

export const ReviewList = ({list, updateLike}) => {
    return list.length ? (
        <div className="comments">
            {
                list.map(review => <Comment key={review.id} review={review} updateLike={updateLike} />)
            }
        </div>
    ) : (
        <div className="alert alert-link">
            No reviews.
        </div>
    )
}

class Comment extends Component {

    toggleLike(id)
    {
        axios.post(`/game/review/toggle/like/${id}`)
        .then(response => this.props.updateLike(id))
    }

    render()
    {
        const {review} = this.props;
        const {user} = review;


        return (
            <div className="comment">
                <div className="comment-user">
                    <div className="comment-user-ava">
                        <img src={user.ava} alt={user.full_name} />
                    </div>
                </div>
                <div className="comment-body">
                    <div>
                        <div className="d-inline-block">
                            <p>
                                <Link to={`/gg/${user.username}`} >
                                    <strong>{user.full_name}</strong>
                                </Link>
                                <span className="comment-time d-block">
                                    {review.created_at}
                                </span>
                            </p>
                        </div>
                        <div className="float-right">
                            <div className={`review-type ${review.type}`}>
                                <div className="d-inline-block">
                                    <span className="icon-finger-up"></span>
                                    <span className="icon-finger-down"></span>
                                </div>
                                <div className="d-inline-block">
                                    <span className="type-recommend">
                                        Recommend
                                    </span>
                                    <span className="type-not-recommend">
                                        Do not Recommend
                                    </span>
                                </div>
                                <div className="d-inline-block">
                                    <span className="icon-comment"></span>  
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div style={{marginLeft: '-65px'}}>

                        <div>
                            {placeEmoji(review.text)}
                        </div>
                        <div className="w-100 ">
                            <div className="comment-actions">
                                <span 
                                    className={review.likes ? 'active':''}
                                    onClick={this.toggleLike.bind(this, review.id)}
                                >
                                    <span className="icon-liked"></span>
                                    <span className="icon-heart"></span>
                                </span>
                                <span >{review.like_count | 0}</span>
                            </div>
                        </div>

                    </div>
                    
                </div>
            </div>
        )
    }
}