import React, {Component} from 'react';
import Textarea from 'react-textarea-autosize';
import { Picker } from 'emoji-mart';
import Popup from 'reactjs-popup';

export default class Input extends Component{

    state = {
        emoji: false
    }

    constructor(...props)
    {
        super(...props);
        this.ref = React.createRef();
    }

    onChange(e)
    {
        const {value} = e.target;
        this.props.onType(value);
    }

    insertEmoji(emoji)
    {
        this.props.onType( this.props.value + ' ' + emoji.colons + ' '  )
        this.ref.focus();
    }

    toggleEmoji()
    {
        this.setState(() => {
            return {
                emoji:!this.state.emoji
            }
        });
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

    static getDerivedStateFromProps(nextProps, state)
    {        
        if (nextProps.emoji)
        {
            return {
                emoji: false
            }
        } // end if

        return null;
    }
    

    render()
    {
        
        return (
            <div className="textarea has-emoji">
                
                <Popup
                    open={this.state.emoji}
                    closeOnDocumentClick={true}
                    position="top right"
                    overlayStyle={{display:'none'}}
                    lockScroll={false}
                    closeOnEscape={true}
                    modal={false}
                    onOpen={this.onEmoji.bind(this)}
                    onClose={this.onCloseEmoji.bind(this)}
                    trigger={<button className={this.state.emoji ? "emoji active" : "emoji"}></button>}
                >
                    <Picker 
                        onSelect={this.insertEmoji.bind(this)}
                        tooltip={false} 
                        set="google" 
                        sheetSize="16" 
                    />
                </Popup>
                <Textarea
                    maxRows={15}
                    inputRef={ref => {this.ref=ref;}}
                    onFocus={this.props.onFocus}
                    onChange={this.onChange.bind(this)}
                    value={this.props.value}
                    placeholder={`What is your toughts ?`}
                />
            </div>
        );
    }
}