import React, {Component, Fragment} from 'react';

export default class AboutTab extends Component{

    render()
    {
        const {description} = this.props;
        return (
            <Fragment>
                <p className="p-2 m-0">
                    {description}
                </p>
            </Fragment>
        )
    }
}