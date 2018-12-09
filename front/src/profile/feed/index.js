import React, {Component} from 'react';

const Post = ({data}) => {


    return (
        <div className="post">
            <div className="post-header">
                <div className="post-author">
                    <div className="user-ava">
                        <img src="/img/default-ava.jpg" alt="That's you !" />
                    </div>
                    <div className="user-post-info">
                        <h2>{data.user.full_name}</h2>
                        <span className="post-time">{data.created_at}</span>
                    </div>
                </div>
                <div className="post-author-meta">
                    <div className="like"><span className="icon-heart"></span> 45</div>
                    <div className="shares"><span className="icon-share"></span> 199</div>
                </div>
            </div>


            <div className="post-text">
                {data.content}
            </div>

            <div className="post-media">

                {
                    data.media.map((src, index) => {
                        return (
                            <img src={src.full_path} key={index} />
                        )
                    })
                }

            </div>

            <div className="post-comments">

                <div className="comment">
                    <div className="comment-user">
                        <a href="#">
                            <img src="/img/default-ava.jpg" alt="Mehmet" />
                        </a>
                    </div>
                    <div className="comment-container">
                        <div className="comment-user-info">
                            <a href="#">
                                <h2>Ahmet Kaya</h2>
                            </a>
                            <span>20 seconds ago</span>
                        </div>
                        <div className="comment-content">
                            text or image
                        </div>
                        <div className="comment-footer">
                            <div className="share">
                                <a href="#" className="icon-reply-to-comment"></a>
                            </div>
                            <div className="likes">
                                <a href="">
                                    <span className="icon-heart-empty"></span>
                                    <span className="text">15</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="see-all-comments">
                    <a href="#more">See all comments</a>
                </div>

                <div className="user-post-comment">
                    <div className="user">
                        <a href="#">
                            <img src="/img/default-ava.jpg" alt="Ahmet" />
                        </a>
                    </div>
                    <div className="comment-area">
                        <input type="text" placeholder="Nice post ?" />
                        <div className="comment-actions">
                            <a href="#" className="icon-video-cam"></a>
                            <a href="#" className="icon-photo-cam"></a>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default class FeedList extends Component{

    render(){
        return (
            <div>
                {
                    this.props.list.map((item, index) => {
                        return (
                            <Post key={index} data={item} />
                        )
                    })
                }
            </div>
        )
    }
}