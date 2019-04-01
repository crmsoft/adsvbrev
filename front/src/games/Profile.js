import React, {Component, Fragment} from 'react';

const Ava = ({src}) => {
    return (
        <div className="ava-wrapper">
            <div className="ava" id="ava">
                <div className="ava-holder">
                    <div className="ava-edit">
                        <span>Edit Avatar</span>
                    </div>
                    <img src={src}  />
                </div>
            </div>
        </div>
    )
}

export default class Profile extends Component {

    render()
    {

        const editor = false;
        
        return (
            <Fragment>
                <div className="profile"></div>
                <div className="container">
                    <div className="row">
                        <div className="wotes">
                            <span className="wotes-avg">
                                3.0
                            </span>
                            <div className="wotes-stars">
                                <span className="wote-filler"></span>
                                <span className="wote-bar" style={{width: `71%`}}></span>
                                <span className="wote-mask"></span>
                                <span className="wote-filler"></span>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-auto">
                            <Ava src={`img_path`} />
                        </div>
                        <div className="col-auto">
                            <div className="content-bottom">
                                <h1>
                                    {`data.name`}
                                </h1>
                            </div>
                        </div>  
                        <div className="col-auto flex-grow-1">
                            <div className="content-bottom flex-column-reverse">
                                <ul className="social-list">
                                    <li>
                                        <a href='/asdc'>
                                            <span className="icon-twitch"></span>
                                        </a>
                                    </li>
                                    <li>
                                        <a>
                                            <span className="icon-youtube"></span>
                                        </a>
                                    </li>
                                    <li>
                                        <a>
                                            <span className="icon-steam"></span>
                                        </a>
                                    </li>
                                </ul>

                                <div className="profile-actions">
                                    <button className="dd-btn btn-sm btn-full">
                                        <span className="icon-plus"></span>
                                        {`Join Game`}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}