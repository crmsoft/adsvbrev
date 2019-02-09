import React, {Component} from 'react';

export default class Footer extends Component {
    
    render(){
        return (
            <div className="footer">
                <div className="actions">
                    <div className="add-media">
                        <a 
                            onClick={this.props.onSelect}
                            href="javascript:void(0)" 
                            className="icon-photo-cam"></a>
                    </div>
                    <button 
                        className={`btn btn-sm btn-full`}
                        disabled={this.props.enabled}
                        onClick={this.props.submitPost}>Post</button>
                </div>
            </div>
        )
    }
}