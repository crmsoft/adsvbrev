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

        const {data, editor} = this.props;
        
        return (
            <Fragment>
                <div className="profile"></div>
                <div className="container">
                    <div className="row">
                        <div className="col-auto">
                            <Ava src={data.ava} />
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
                                {
                                    editor ? (
                                        null
                                    ) : (
                                        data.user_participant ? (
                                            <button 
                                                onClick={this.props.leave}
                                                className="dd-btn">
                                                Leave Event
                                            </button>
                                        ) : (
                                            <button 
                                                onClick={this.props.join}
                                                className="dd-btn">
                                                Join
                                            </button>
                                        )   
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}