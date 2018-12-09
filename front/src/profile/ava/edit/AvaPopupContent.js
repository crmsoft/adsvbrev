import React, {Component} from 'react';

export default class AvaPoupContent extends Component {
    render(){
        return (
            <div>
                <img src={this.props.ava} />
            </div>
        )
    }
}