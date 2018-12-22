import React, {Component} from 'react';
import Textarea from 'react-textarea-autosize';
import 'emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart'
import { Emoji } from 'emoji-mart'

export default class Input extends Component{

    state = {
        message: ''
    }

    onText(e){
        this.setState({
            message: e.target.value
        })
    }

    sendMessage(e){

        if(this.state.message.trim() && e.key === 'Enter')
        {
            e.stopPropagation();
            this.props.onMessage(this.state.message.trim());
            this.setState({message: ''});
        }

    }

    render(){
        return (
            <div className="input">
                <div className="emoji">
                    <Emoji emoji={{ id: 'santa', skin: 3 }} size={20} />
                </div>
                <Textarea 
                    maxRows={2}
                    onKeyDown={this.sendMessage.bind(this)}
                    value={this.state.message}
                    onChange={this.onText.bind(this)}
                />
                <div>
                    <Emoji emoji={{ id: 'pushpin', skin: 3 }} size={20} />
                </div>
            </div>
        )
    }
}