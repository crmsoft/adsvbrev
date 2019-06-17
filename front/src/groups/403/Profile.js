import React, {Fragment} from 'react';

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

export default function({
    data, knocked, setKnock
}){

    return (
        <Fragment>
            <div className="profile"></div>
            <div className="container">
                <div className="row">
                    <div className="col-auto">
                        <Ava src={`${data.ava}`} />
                    </div>
                    <div className="col-auto">
                        <div className="content-bottom">
                            <h1>
                                <a
                                    href="javascript:void(0)"
                                >
                                    {data.name}
                                </a>
                            </h1>
                        </div>
                    </div>  
                    <div className="col-auto flex-grow-1">
                        <div className="content-bottom flex-column-reverse">
                            <div className="profile-actions">

                                <button 
                                    disabled={knocked} 
                                    onClick={e => setKnock(true)}
                                    className="dd-btn btn-sm btn-full">
                                    <span className="icon-plus"></span>
                                    { knocked ? 'knock knock' : 'Knock on the door' }
                                </button>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}