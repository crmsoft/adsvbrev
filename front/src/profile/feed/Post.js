import React, {Component, Fragment} from 'react';
import axios from 'axios';
import Popup from 'reactjs-popup';
import handleViewport from 'react-in-viewport';
import {Link} from 'react-router-dom';
import ImageZoom from '../../general/ImageZoom';

import {placeEmoji, urlify} from '../../utils';
import Comments from '../../comment/Comments';
import AddComment from '../../comment/AddComment';

const PostContent = ({
	more,
	content,
	post_id,
	repost,
	media,
	modal
}) => {
	return (
		repost ? (
			<div className="post-shared">
				<Post 
					modal={modal}
					key={repost.id}
					post={repost}
					repost={true}
				/>
			</div>
		) : (
			<a href={modal ? `javascript:void(0)` : `#p=${post_id}`} style={{textDecoration:'none'}}>
				<p>
					{
						content
					}					
					{
						more
					}
				</p>
				<div className={ media.length > 1 ? `post-media n-${media.length}` : "post-media"  }>
					{
						media.map((url, index) => {
							return (
								<div className="media" key={url.full_path}>
									<ImageZoom 
										disabled={!modal}
										key={index} 
										src={url.full_path.replace('520', 'original')} 
										thumb={url.full_path}  
									/>
								</div>
							)
						})
					}
				</div>
			</a>
		)
	)
}


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
				repost: nextProps.repost,
				hasMore: nextProps.post.content.length > 250,
				pageType: nextProps.pageType,
				pageId: nextProps.pageId
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

	toggleShare()
	{
		const {post} = this.state;
		axios.post(`/post/share/${post.id}`)
		.then(response => (response.data === 1) && this.props.toggleShare(post.id))
	}

	deletePost()
	{
		const {post, pageType, pageId} = this.state;
		axios.post(`/post/delete/${post.id}`, {
			type: pageType,
			target: pageId
		})
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

	hasMedia(text)
	{
		return (
			text.indexOf('soundcloud.com/player') !== -1 || 
			text.indexOf('www.twitch.tv') !== -1 || 
			text.indexOf('player.twitch.tv') !== -1 || 
			text.indexOf('https://youtu') !== -1 ||
			text.indexOf('https://www.youtu') !== -1
		);
	}

    render()
    {
		
		const {post, repost} = this.state;
		const {hasMore} = this.state;

		let content  = (post.content);
		let more = null;

		if (hasMore && !this.hasMedia(content))
		{
			content = content.substr(0,240)
			content = content.substr(0, Math.min(content.length, content.lastIndexOf(" ")))

			more = (
				<a 
					className="more"
					href="javascript:void(0)"
					onClick={this.showAll.bind(this)}
				>More...</a>
			);
		} // end if

		content = placeEmoji(content);
console.log(content);

		if (typeof(content) === 'string')
		{
			content = urlify(content);
		} else {
			content = content.map(c => {
				return (typeof c === 'string') ? urlify(c) : c;
			})
		} // end if
			
        return (
            <div className="post">

				<div className="post-header">
					<div className="user-ava">
						<img src={post.poster.ava} alt={post.poster.full_name} />
					</div>
					<div className="post-main-info">
						<Link to={post.poster.username ? `/${post.poster.path}/${post.poster.username}` : `/event/${post.poster.id}#some=id`}>
							<h3 className="post-user">{post.poster.full_name}</h3>
						</Link>
						<h4 className="post-username">{post.poster.username}</h4>
						<span className="post-time">{post.created_at}</span>
					</div>
					<div className="post-options">
						{
							!this.props.guest && !repost ? (
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
									trigger={<span className="icon-more"></span>}
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
							) : repost ? null : (<span className="icon-more"></span>)
						}
					</div>
				</div>

				<div className="post-content">
					<PostContent 
						modal={this.props.modal}
						post_id={post.id}
						more={more}
						content={content}
						repost={post.repost}
						media={post.media}
					/>
					{
						repost ? null : (
							<div className="post-actions">
								<span className={ post.likes ? "icon like active" : "icon like" } onClick={this.toggleLike.bind(this)}>
									<span className="icon-liked"></span>
									<span className="icon-heart"></span>
								</span>
								<span >{post.like_count | 0}</span>
								<span 
									onClick={this.toggleShare.bind(this)}
									className={post.shares ? `icon icon-shared` : `icon icon-share`}></span>
								<span >{post.share_count | 0}</span>
							</div>
						)
					}
				</div>
				{
					repost ? null : (
						<Fragment>
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
						</Fragment>
					)
				}
			</div>
        )
    }
}

const PostComponent =  handleViewport(Post);

export default PostComponent;