import React, {Component} from 'react';
import axios from 'axios';
import store from './redux/store';
import {
    POST_ADDED
} from './redux/actions';
import Input from './Input';
import PostMedia from './Media';
import Footer from './Footer';

export default class CreatePostComponent extends Component{

    state = {
        post: '',
        saving: false,
        active: false,
        saved: false,
        select: false,
        files: []
    }

    constructor(...props){
        super(...props);
        this.submitPost = this.submitPost.bind(this);
        this.onFiles = this.onFiles.bind(this);
        this.onFileRemove = this.onFileRemove.bind(this);
        this.onEnter = this.onEnter.bind(this);
    }

    onEnter(){
        this.setState(state => {
            return {
                active:true,
                saved:false
            }
        })
    }

    submitPost(){
        
        this.setState({saving:true, saved: false});
        
        const data = new FormData();
        data.append('post', this.state.post);
        this.state.files.map(
            file => data.append('media[]', file)
        );

        if (this.props.type)
        {
            data.append('type', this.props.type);
            data.append('id', this.props.id);
        }

        axios.post(`/post/store`, data)
        .then(({data}) => this.setState(state => { 
            return {
                active: false,
                post:'', 
                saving:false, 
                saved:true,
                files: []
            } 
        }, () => {
            store.dispatch({type: POST_ADDED, data: data.data});
        }))
        .catch(err => this.setState({saving:false, saved: false}));

    }

    onFiles( file ){

        // handle user cancel file select.
        if(!file)
        {
            return this.setState(state => {
                return {
                    select: false
                }
            })    
        }

        this.setState(state => {
            return {
                ...state,
                select: false,
                files: [
                    ...state.files,
                    file
                ]
            }
        })
    }

    onFileRemove(index)
    {
        if(this.state.files[index])
        {

            this.setState(state => {
                return {
                    files: state.files.filter((f,i) => {
                        return i !== index;
                    })
                }
            });

        } // end if
    }

    onSelect()
    {
        this.setState({select: true});
    }

    onText(text)
    {
        this.setState(() => {
            return {
                post: text
            }
        });
    }

    render(){
        return (
            <div className={`wrapper ` + (this.state.active ? `active`:``)}>
                <Input 
                    emoji={this.state.saved}
                    placeholder={`Tell about your adventure in favorite game...`}
                    onFocus={this.onEnter.bind(this)}
                    onType={this.onText.bind(this)}
                    value={this.state.post}
                />
                <PostMedia 
                    reset={this.state.saved}
                    select={this.state.select}
                    onFiles={this.onFiles}
                    onRemove={this.onFileRemove}
                />
                <Footer 
                    onSelect={this.onSelect.bind(this)}
                    enabled={this.state.saving || this.state.post.length <= 0}
                    saved={this.state.saved}
                    submitPost={this.submitPost}
                />
                <div className="user-actions" onClick={() => { this.onEnter() }}>
                    <a href="javascript:void(0)" className="icon-video-cam"></a>
                    <a href="javascript:void(0)" className="icon-photo-cam"></a>
                </div>
            </div>
        )
    }
}