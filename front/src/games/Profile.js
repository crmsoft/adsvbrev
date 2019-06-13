import React, {Component, Fragment} from 'react';
import {Link} from 'react-router-dom';

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
        const data = this.props.data;
        return (
            <Fragment>
                <div className="profile"></div>
                <div className="container">
                    <div className="row">
                        <div className="wotes">
                            <span className="wotes-avg">
                                {(data.avg_rate / 20).toFixed(1)}
                            </span>
                            <div className="wotes-stars">
                                <span className="wote-filler"></span>
                                <span className="wote-bar" style={{width: `${data.avg_rate}%`}}></span>
                                <span className="wote-mask"></span>
                                <span className="wote-filler"></span>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-auto">
                            <Ava src={`${data.ava}`} />
                        </div>
                        <div className="col-auto">
                            <div className="content-bottom">
                                <h1>
                                    <a
                                        onClick={() => this.props.init()}
                                        href="javascript:void(0)"
                                    >
                                        {data.name}
                                    </a>
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
                                {
                                    data.participant ? (
                                        <button 
                                            onClick={e => this.props.onLeave()}
                                            className="dd-btn btn-gray btn-sm">
                                            <span className="icon-remove"></span>
                                            {`Leave Game`}
                                        </button>
                                    ) : (
                                        <button 
                                            onClick={e => this.props.onJoin()}
                                            className="dd-btn btn-sm btn-full">
                                            <span className="icon-plus"></span>
                                            {`Join Game`}
                                        </button>
                                    )
                                }
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}