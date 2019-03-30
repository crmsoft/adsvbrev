import React, {Component} from 'react';
import axios from 'axios';
import Textarea from 'react-textarea-autosize';
import Popup from 'reactjs-popup';
import {
    Picker
} from 'emoji-mart';

import Media from '../post-add/Media';
import store from '../profile/fetch/store';
import {
    APPEND_COMMENT
} from '../profile/fetch/actions';
import headerStore from '../header/store';

let unListen = () => {};

export default class AddComment extends Component {
    
    state = {
        text: '',
        flie: null,
        user: {},
        replyToComment: null,
        needFocus: false
    }

    constructor(...props)
    {
        super(...props);
        this.ref = React.createRef();
    }

    /**
     * submit btn click handler
     * 
     * @param {Event} e 
     */
    submit(e) 
    {
        if (this.state.text) 
        {
            let {text} = this.state;

            let url = `/comment/store/${this.props.post.id}`;

            if (this.state.replyToComment)
            {
                url = `/comment/store/${this.props.post.id}/${this.state.replyToComment.comment}`;
                text = text.replace(`${this.state.replyToComment.user.username},`, ``);
            } // end if

            const frm = new FormData();
            frm.append('comment', text);
            this.state.file && frm.append('file', this.state.file);

            axios.post(url, frm)
            .then(response => {  this.props.onComment(response.data); })
            .then(() => this.setState(() => { return {text:'',file:null, emoji: false, replyToComment: null}}))
        } // end if
    }

    /**
     * controlle textarea value
     * 
     * @param {Event} e Textarea
     */
    onText(e)
    {
        let text = e.target.value;
        let replyTo = this.state.replyToComment;
        if(replyTo)
        {
            let {username} = replyTo.user;
            if(text.indexOf(`${username},`) === -1)
            {
                text = '';
                replyTo = null;
            } // end if
        } // end if

        this.setState(() => {
            return {
                text: text,
                replyToComment: replyTo
            }
        });
    }

    /**
     * user select emoji from picker 
     * 
     * @param {Emoji} emoji Object
     */
    insertEmoji(emoji)
    {
        this.setState({text: this.state.text + ' ' + emoji.colons + ' '});
        this.ref.focus();
    }

    /**
     * User selected a file
     * 
     * @param {File} file Object
     */
    onFiles(file)
    {
        if(file)
        {
            this.setState({file: file});
        } else {
            this.setState({select: false});
        }
    }

    /**
     * User remove previuosly selected file
     * 
     * @param {Integer} index Number
     */
    onFileRemove(index)
    {
        this.setState({file: null})
    }

    /**
     * user clicks on photo cam icon
     * 
     */
    selectFile()
    {
        this.setState({select: !this.state.file});
    }

    /**
     * user clicks on emoji icon, Popup onOpen event !
     */
    onEmoji()
    {
        this.setState(() => { return {emoji:true} });
    }

    /**
     * user close emoji popup, Popup onClose event !
     */
    onCloseEmoji()
    {
        this.setState(() => { return {emoji: false }});
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

    componentDidUpdate()
    {
        if(this.state.needFocus)
        {
            this.ref.focus();
            this.setState(() => {
                return {
                    needFocus: false
                }
            })
        }
    }

    static getDerivedStateFromProps(nextProps, prevState){
        if(nextProps.reply && (prevState.user.username !== nextProps.reply.user.username))
        {   
            return {
                replyToComment: nextProps.reply,
                needFocus: true
            }
        } // end if
        return null;
    }

    render()
    {
        const {user} = this.state;

        /**
         * wait user data to be loaded
         */
        if(!user.username)
        {
            return null;
        }

        let inputClass = this.state.text ? 'submitable' : '';
        inputClass += this.state.file ? ' active':'';

        let comment = this.state.text;

        if(this.state.replyToComment)
        {
            let {username} = this.state.replyToComment.user;
            if (this.state.text.indexOf(username) === -1)
            {
                comment = `${username}, ${comment}`;
            } // end if
        } // end if

        return (
            <div className="add-comment">
                <div className="user">
                    <img src={user.ava} />
                </div>
                <div className={ `input ${inputClass}` }>
                    <Textarea 
                        inputRef={ref => {this.ref=ref;}}
                        placeholder={`What do you think about it ?`}
                        onChange={this.onText.bind(this)} 
                        value={comment}
                    />
                    <Media 
                        onRemove={this.onFileRemove.bind(this)}
                        onFiles={this.onFiles.bind(this)} 
                        select={this.state.select} 
                    />
                    <button onClick={this.submit.bind(this)} className="btn btn-sm btn-full">Send</button>
                </div>
                <div className="actions has-emoji">
                    <Popup
                        open={this.state.emoji}
                        onOpen={this.onEmoji.bind(this)}
                        onClose={this.onCloseEmoji.bind(this)}
                        closeOnDocumentClick={true}
                        position="top center"
                        overlayStyle={{display:'none'}}
                        lockScroll={false}
                        closeOnEscape={true}
                        modal={false}
                        trigger={<button className={this.state.emoji ? "emoji icon-icons active" : "icon-icons emoji"}></button>}
                    >
                        <Picker 
                            onSelect={this.insertEmoji.bind(this)}
                            tooltip={false} 
                            set="google" 
                            sheetSize="16" 
                        />
                    </Popup>
                    <span onClick={this.selectFile.bind(this)} className="icon-photo-cam"></span>
                    <span className="icon-v-cam"></span>
                </div>
            </div>
        )
    }
}