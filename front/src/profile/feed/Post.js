import React, {Component} from 'react';
import {placeEmoji, urlify} from '../../utils';
import Comments from '../../comment/Comments';
import AddComment from '../../comment/AddComment';
import axios from 'axios';
import Popup from 'reactjs-popup';
import handleViewport from 'react-in-viewport';


class Post extends Component{

	state = {
		reply: null,
		open: false
	}

	static getDerivedStateFromProps(nextProps, state)
	{
		if (state.hasMore === undefined || (state.post.id !== nextProps.post.id))
		{
			return {
				post: nextProps.post,
				hasMore: nextProps.post.content.length > 250
			};
		}

		return null
	}

	/**
	 * user click like btn
	 */
	toggleLike()
	{		
		const {post} = this.state;
		axios.post(`/post/like/${post.id}`)
		.then(response => this.props.toggle(post.id))
	}

	deletePost()
	{
		const {post} = this.state;
		axios.post(`/post/delete/${post.id}`)
		.then(({data}) => {
			if (data.action)
			{
				this.setState(state => { 
					return {open: false}; 
				}, () => this.props.onDelete(this.state.post.id));
			} // end if
		});
	}

	reply(user, comment_id)
	{
		this.setState(() => {
			return {
				reply : {
					user: user,
					comment: comment_id
				}
			}
		}, () => {
			this.setState(() => {
				return {
					reply: null
				}
			})
		});
		
	}

	onCommentAdded({data})
	{
		this.setState(() => {
			return {
				pushComment: data
			}
		}, () => {
			this.setState(() => {
				return {
					pushComment: null
				}
			})
		});
	}

	showAll()
	{
		this.setState(() => {
			return {
				hasMore: false,
				open: false
			}
		})
	}

    render()
    {
		
		const {post} = this.state;
		const {hasMore} = this.state;

		let content  = (post.content);

		if (hasMore)
		{
			content = content.substr(0,240)
			content = content.substr(0, Math.min(content.length, content.lastIndexOf(" ")))
		} // end if

		content = placeEmoji(content);

		if (typeof(content) === 'string')
		{
			content = urlify(content);
		} else {
			content = content.map(c => {
				return (typeof c === 'string') ? urlify(c) : c;
			})
		} // end if

		const more = hasMore ? (
						<a 
							className="more"
							href="javascript:void(0)"
							onClick={this.showAll.bind(this)}
						>More...</a>
					) : null
        return (
            <div className="post">

				<div className="post-header">
					<div className="user-ava">
						<img src={post.user.ava} alt={post.user.full_name} />
					</div>
					<div className="post-main-info">
						<h3 className="post-user">{post.user.full_name}</h3>
						<h4 className="post-username">{post.user.username}</h4>
						<span className="post-time">{post.created_at}</span>
					</div>
					<div className="post-options">
						{
							!this.props.guest ? (
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
									trigger={<span>...</span>}
								>
									<ul>
										<li>
											pin post
										</li>
										<li
											onClick={this.deletePost.bind(this)}
										>
											delete
										</li>
									</ul>	
								</Popup>
							) : <span>...</span>
						}
					</div>
				</div>

				<div className="post-content">
					<p>
						{
							content
						}					
						{
							more
						}
					</p>
					<div className={ post.media.length > 1 ? `post-media n-${post.media.length}` : "post-media"  }>
                        {
                            post.media.map(url => {
								return (
									<div className="media" key={url.full_path}>
										<img src={url.full_path}/>
									</div>
								)
							})
						}
                    </div>
					<div className="post-actions">
						<span className={ post.likes ? "icon like active" : "icon like" } onClick={this.toggleLike.bind(this)}>
							<span className="icon-heart"></span>
							<span className="icon-heart-empty"></span>
						</span>
						<span >{post.like_count | 0}</span>
						<span className="icon icon-share"></span>
						<span >{post.share_count | 0}</span>
					</div>
				</div>
				<Comments 
					key={`${post.id}_comment`}
					push={this.state.pushComment}
					replyTo={this.reply.bind(this)}
					post={post.id} 
					comments={post.comment} 
				/>
				<AddComment 
					onComment={this.onCommentAdded.bind(this)}
					reply={this.state.reply}
					key={post.id}
					post={post}
				/>
			</div>
        )
    }
}

const PostComponent =  handleViewport(Post);

export default PostComponent;