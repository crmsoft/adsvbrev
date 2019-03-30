import React, {Component} from 'react';

export default class MessageAction extends Component{
    render(){
        return (
            <div className="d-flex">
                <button className="dd-btn btn-sm btn-full" >
                    <span className="icon-message"></span>
                    Write
                </button>
                <button className="dd-btn btn-sm btn-full btn-more">
                    <span className="icon-more"></span>
                </button>
            </div>
        )
    }
}