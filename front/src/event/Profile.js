import React, {Component, Fragment} from 'react';

import ImageZoom from '../general/ImageZoom';

const Ava = ({src}) => {
    return (
        <div className="ava-wrapper">
            <div className="ava" id="ava">
                <div className="ava-holder">
                    <ImageZoom thumb={src} src={src.replace('200', 'original')} />
                </div>
            </div>
        </div>
    )
}

export default class Profile extends Component {

    render()
    {

        const {data} = this.props;
        
        return (
            <Fragment>
                <div className="profile"></div>
                <div className="container">
                    <div className="row">
                        <div className="col-auto">
                            <Ava src={data.ava ? data.ava:''} />
                        </div>
                        <div className="col-auto">
                            <div className="content-bottom">
                                <h1>
                                    {data.name}
                                </h1>
                            </div>
                        </div>  
                        <div className="col-auto">
                            <div className="content-bottom">
                                <span>
                                    Starts at: 
                                </span>
                                <span>
                                    {data.start_human}
                                </span>
                            </div>
                        </div>
                        <div className="col-auto flex-grow-1">
                            <div className="content-bottom flex-column-reverse">
                                
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}