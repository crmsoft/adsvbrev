import React,{Component} from 'react';

export default class Message extends Component{
    render(){
        const {message} = this.props;
        return (
            <div>
                {message.created_at}
                {message.message}
            </div>
        )
    }
}