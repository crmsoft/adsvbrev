import React, {Component, Fragment} from 'react';

export default class AboutTab extends Component{

    render()
    {
        const {description} = this.props;
        return (
            <div className="row about">
                <div className="col-auto title">
                    About Event
                </div>
                <div className="col-auto content">
                    <p className="m-0">
                        {description}
                    </p>
                </div>
            </div>
        )
    }
}