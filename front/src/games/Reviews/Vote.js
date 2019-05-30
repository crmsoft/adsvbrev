import React, {Component, Fragment} from 'react';

import Review from './Review';

export default class Vote extends Component{


    render()
    {
        return (
            <Fragment>
                <div className="header">
                    <a
                        href="javascript:void(0)"
                    >
                        <div className="d-inline">
                            &#63;
                        </div>
                        <h3 className="d-inline">
                            Do you recommend this game
                        </h3>
                    </a>
                </div>
                <div className="block-content reviews">
                    <div className="row">
                        <div className="col">
                            <span className="icon-finger-up positive"></span>
                            <span> 0</span>
                        </div>
                        <div className="col">
                            <span className="icon-finger-down negative"></span>
                            <span> 1500</span>
                        </div>
                    </div>
                    <hr />

                    <div className="review-list">
                        
                        <Review />
                        <Review />

                        <div className="text-right">
                            <a href="javascript:void(0)">
                                <small className="main-color">
                                    View All
                                </small>
                            </a>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}