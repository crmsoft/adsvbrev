import React,{Component} from 'react';

export default class Header extends Component{

    render()
    {
        return (
            <div className={`dd-modal-header`}>
                <h3
                    className="title"
                >
                    {this.props.title}
                </h3>
                <span
                    className="close"
                    onClick={this.props.onClose}
                >×</span>
            </div>
        )
    }
}