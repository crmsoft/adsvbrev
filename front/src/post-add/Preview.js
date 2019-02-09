import React, {Component} from 'react';

export default class Preview extends Component {

    remove(index)
    {
        this.props.remove(index);
    }

    render()
    {
        return (
            <div className="previews">
                {
                    this.props.previews.map((pre, index) => {
                        return (
                            <div 
                                key={index}
                                className="preview"
                                style={{backgroundImage: `url(${pre})` }} 
                            >
                                <div
                                    onClick={e => { this.remove.call(this,index); }} 
                                    className="hover">
                                    <span>×</span>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}