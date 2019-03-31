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
import Popup from 'reactjs-popup';


export default class Comment extends Component{


    state = {
        open: false
    }

    /**
     * user click like btn
     */
    toggleLike()
    {
        const id = this.props.comment.id;

        axios.post(`/comment/like/${id}`)
        .then(response => {
            this.props.toggle(id);
        })
    }

    delete()
    {
        let {comment} = this.props;
        axios.post(`/comment/delete/${comment.id}`)
        .then(response => {
            this.props.onDelete(comment.id);            
        });
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
                                <span className="icon-liked"></span>
                                <span className="icon-heart"></span>
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
                    {
                        user.username === this.props.user.username ? (
                            <Popup
                                open={this.state.open}
                                onClose={() => {this.setState({open:false})}}
                                onOpen={() => {this.setState({open:true})}}
                                keepTooltipInside={true}
                                lockScroll={false}
                                closeOnEscape={true}
                                closeOnDocumentClick
                                position="left center"
                                modal={false}
                                trigger={<span className="icon-more">&nbsp;</span>}
                            >
                                <ul>
                                    <li
                                        onClick={this.delete.bind(this)}
                                    >delete</li>
                                </ul>
                            </Popup>
                        ) : (<span className="icon-more"></span>)
                    }
                    
                </div>
            </div>
        )
    }
}