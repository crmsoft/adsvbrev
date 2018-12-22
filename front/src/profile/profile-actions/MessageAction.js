import React, {Component} from 'react';

export default class MessageAction extends Component{
    render(){
        return (
            <div className="d-flex">
                <button className="dd-btn btn-sm btn-full" >
                    <span className="icon-yt"></span>
                    Write
                </button>
                <button className="dd-btn btn-sm btn-full btn-more">...</button>
            </div>
        )
    }
}