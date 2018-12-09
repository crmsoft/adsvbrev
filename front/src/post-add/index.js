import React, {Component} from 'react';
import Textarea from 'react-textarea-autosize';
import axios from 'axios';

class Upload extends Component {
    
    constructor(...props){
        super(...props);
        this.chooseFile = this.chooseFile.bind(this);
        this.onUserSelectFile = this.onUserSelectFile.bind(this);
        this.ref = React.createRef();
    }

    chooseFile(){
        this.ref.current.click();
    }

    onUserSelectFile(e){
        const el = e.target;
        if( el.files.length > 0 ){
            const file = el.files[0];
            const reader = new FileReader();
            reader.addEventListener('load', () =>
                this.props.onFiles( file, reader.result )
            );
            reader.readAsDataURL(el.files[0]);
        } // end if     
    }

    render(){
        return (
            <div>
                <input 
                    className="d-none"
                    type="file" 
                    ref={this.ref} 
                    onChange={this.onUserSelectFile} />
                <a 
                    onClick={this.chooseFile}
                    href="javascript:void(0)" 
                    className="icon-photo-cam"></a>
            </div>
        )
    }
}

class Footer extends Component {
    state = {
        previews: []
    }

    constructor(...props){
        super(...props);
        this.onFiles = this.onFiles.bind(this);
    }

    onFiles(file, preview){
        this.setState((state) => {
            return {
                previews: [
                    ...state.previews,
                    preview
                ]
            }
        }, () => {
            this.props.onFiles(file);
        });
    }

    componentDidUpdate(props, state){
        if(props.saved && state.previews.length > 0){
            this.setState(state => {
                return {
                    previews: []
                }
            });
        }
    }

    render(){
        return (
            <div className="footer">
                <div className="container-with-media">
                    {
                        this.state.previews.map((src,index) => {
                            return <img key={index} src={src} />
                        })
                    }
                </div>
                <div className="actions">
                    <div className="add-media">
                        <Upload 
                            onFiles={this.onFiles}
                        />
                    </div>
                    <button 
                        disabled={this.props.enabled}
                        onClick={this.props.submitPost}>Post</button>
                </div>
            </div>
        )
    }
}

export default class CreatePostComponent extends Component{

    state = {
        post: '',
        saving: false,
        active: false,
        formData: new FormData(),
        saved: false
    }

    constructor(...props){
        super(...props);
        this.onFieldChange = this.onFieldChange.bind(this);        
        this.submitPost = this.submitPost.bind(this);
        this.onFiles = this.onFiles.bind(this);
        this.onEnter = this.onEnter.bind(this);
    }

    onEnter(){
        this.setState(state => {
            return {
                active:true,
                saved:false,
                formData: state.active ? state.formData : (new FormData())
            }
        })
    }

    onFieldChange(e){
        const value = e.target.value;

        this.setState({
            post: value
        });
    }

    submitPost(){
        
        this.setState({saving:true, saved: false});
        
        const data = this.state.formData;
        data.append('post', this.state.post);

        axios.post(`/post/store`, data)
        .then(response => this.setState(state => { 
            return {
                active: false,
                post:'', 
                saving:false, 
                saved:true
            } 
        }))
        .catch(err => this.setState({saving:false, saved: false}));

    }

    onFiles( file ){
        this.setState(state => {
            state.formData.append(`media[]`,file);
            return {
                ...state
            }
        })
    }

    render(){
        return (
            <div className={`wrapper ` + (this.state.active ? `active`:``)}>
                <Textarea 
                    placeholder={`Tell about your adventure in favorite game...`}
                    onFocus={this.onEnter}
                    value={this.state.post}
                    onChange={this.onFieldChange}
                />
                <Footer 
                    onFiles={this.onFiles}
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