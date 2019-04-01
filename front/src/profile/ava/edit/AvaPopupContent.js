import React, {Component} from 'react';

export default class AvaPoupContent extends Component {
    render(){
        return (
            <div>
                <img style={{
                    display: `block`,
                    width: `auto`,
                    margin: `0 auto`,
                    maxHeight: `250px`
                }} src={this.props.ava} />
            </div>
        )
    }
}