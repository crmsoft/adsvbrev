import React, {Component} from 'react';
import Textarea from 'react-textarea-autosize';
import 'emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart'
import FileUpload from './FileUpload';

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
        this.setState(this.state.sended ? 
            {   
                message: '',
                sended: false,
                gallery: false,
                attachment: null
            }
            :
            {
                message: e.target.value
            }
        )
    }

    sendMessage(e){

        if(this.state.message.trim() && e.key === 'Enter')
        {
            e.stopPropagation();
            this.props.onMessage(this.state.message.trim(), this.state.gallery ? this.state.attachment : null);
            this.setState({sended: true});
        }

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

    render(){

        const {gallery} = this.state;

        return (
            <div className="input has-emoji">
                <FileUpload 
                    onFileChosen={this.onFileSelected.bind(this)}
                    open={gallery}
                />
                <div className={this.state.emoji ? "emoji-container show" : "emoji-container"}>   
                    <Picker 
                        onSelect={this.insertEmoji.bind(this)}
                        tooltip={false} 
                        set="google" 
                        sheetSize="16" 
                    />
                </div>
                <div className="emoji" onClick={this.toggleEmoji.bind(this)}>
                    <span className="icon-icons"></span>
                </div>
                <Textarea 
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