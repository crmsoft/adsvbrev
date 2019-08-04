import React, {Component} from 'react';
import Textarea from 'react-textarea-autosize';
import 'emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart'
import FileUpload from './FileUpload';
import UserNamesList, {getSelection} from './UserNamesList';

const searchUsernamePattern = (text, cursor) => {
    let user_helper_shown = null;

    for (let l = cursor - 1; l >= 0; l--) {
        if (text[l] === ' ') {
            break;
        } else if ( text[l] === '@' && ((text[l - 1] && (text[l - 1] === ' ')) || (l === 0)) ) {
            user_helper_shown = text.substring(l + 1, cursor);
        } // end if
    } // end for

    return user_helper_shown;
}

export default class Input extends Component{

    state = {
        message: '',
        sended: false,
        emoji: false,
        gallery: false
    }

    constructor(props, context)
    {
        super(props, context);
        this.inputRef = React.createRef();
    }

    componentDidMount()
    {
        this.inputRef.focus();
    }

    onText(e){
        if (this.state.sended) {
            this.setState(() => ({
                message: '',
                sended: false,
                gallery: false,
                attachment: null
            }))
        } else {
            const {value} = e.target;
            this.setState(() => ({
                message: value,
                usernamePattern: searchUsernamePattern(value, this.inputRef.selectionStart)
            }));
        } // end if
    }

    sendMessage(e){

        const keyCode = (e.which) ? e.which : e.keyCode
        const {message, usernamePattern, gallery, attachment} = this.state;        

        if(keyCode === 13)
        {
            if (usernamePattern !== null) {
                e.preventDefault();
                this.onUserAttach.call(this);
            } else if (message.trim()) {
                e.stopPropagation();
                this.props.onMessage(message.trim(), gallery ? attachment : null);
                this.setState({sended: true});
            }
        } else if (usernamePattern != null) {
            if (keyCode === 40) { // down
                this.setState(() => ({userSelectMoveSelection:'down'}))
                e.preventDefault();
            } else if (keyCode === 38) { // up
                this.setState(() => ({userSelectMoveSelection:'up'}))
                e.preventDefault();
            } // end if
        } // end if
    }

    toggleEmoji()
    {
        this.setState({emoji: !this.state.emoji});
    }

    insertEmoji(emoji)
    {
       this.setState(state => {
           return {
            message: state.message + ' ' + emoji.colons + ' ',
            emoji: false
           }
       }, () => this.inputRef.focus());
        
    }

    toggleGallery()
    {
        this.setState(() => {
            return {
                gallery: !this.state.gallery
            }
        })
    }

    onFileSelected(file)
    {
        if (file)
        {
            this.setState(() => {
                return {
                    attachment: file
                }
            }, () => this.inputRef.focus())
        } else {
            this.setState(() => {
                return {
                    gallery: false
                }
            });
        } // end if
    }

    showUserAutoComplete()
    {
        this.setState(() => ({
            usernamePattern: searchUsernamePattern(
                this.state.message, 
                this.inputRef.selectionStart
                )
        }));
    }

    onUserAttach(e)
    {
        const {usernamePattern, message} = this.state;
        const {members} = this.props;
        const cursor = this.inputRef.selectionStart;
        const list = members.filter(m => (m.username.indexOf(usernamePattern) !== -1 || (usernamePattern && (usernamePattern.length === 0))));
        const member = list[getSelection()];

        if (!member) {
            return;
        }

        for (let i = cursor; i >= 0; i--){
            if (message[i] === '@') {
                return this.setState(() => ({
                    message: message.substring(0, i) + `@${member.username} ` + message.substring(cursor, message.length),
                    usernamePattern: null
                }));
            } // end if
        } // end for
    }

    render(){

        const {gallery, usernamePattern, userSelectMoveSelection} = this.state;
        
        return (
            <div className="message-input has-emoji">
                <FileUpload 
                    onFileChosen={this.onFileSelected.bind(this)}
                    open={gallery}
                />
                <UserNamesList 
                    onClick={this.onUserAttach.bind(this)}
                    moveSelection={userSelectMoveSelection}
                    members={this.props.members}
                    pattern={usernamePattern}
                />
                <div className={this.state.emoji ? "emoji-container show" : "emoji-container"}>   
                    <Picker 
                        onSelect={this.insertEmoji.bind(this)}
                        tooltip={false} 
                        set="google" 
                        sheetSize="20" 
                    />
                </div>
                <div className="emoji" onClick={this.toggleEmoji.bind(this)}>
                    <span className="icon-icons"></span>
                </div>
                <Textarea 
                    onClick={this.showUserAutoComplete.bind(this)}
                    inputRef={ref => {this.inputRef = ref;}}
                    placeholder="Hello my friend..."
                    maxRows={2}
                    onKeyDown={this.sendMessage.bind(this)}
                    value={this.state.message}
                    onChange={this.onText.bind(this)}
                />
                <div
                    onClick={this.toggleGallery.bind(this)} 
                    className="attach">
                    <span className={gallery ? `icon-cross` : `icon-pine`}></span>
                </div>
            </div>
        )
    }
}