import React, {Component, Fragment} from 'react';
import axios from 'axios';

import Review from './Review';

export default class Vote extends Component{

    onPositive()
    {
        const {id} = this.props;
        axios.post(`/game/vote/store/${id}`, {
            type: 'positive'
        })
        .then(({data}) => {
            if (data.message)
            {
                alert(data.message);
            } // end if
        })
    }

    onNegative()
    {
        const {id} = this.props;
        axios.post(`/game/vote/store/${id}`, {
            type: 'negative'
        })
        .then(({data}) => {
            if (data.message)
            {
                alert(data.message);
            }
        })
    }

    render()
    {        
        const {reviews, vote} = this.props;

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
                            <span 
                                onClick={this.onPositive.bind(this)}
                                className="icon-finger-up positive"></span>
                            <span> {vote.positive}</span>
                        </div>
                        <div className="col">
                            <span 
                                onClick={this.onNegative.bind(this)}
                                className="icon-finger-down negative"></span>
                            <span> {vote.negative}</span>
                        </div>
                    </div>
                    <hr />

                    <div className="review-list">
                        
                        {
                            reviews.map(review => <Review key={review.id} review={review}/>)
                        }
                        
                        {
                            reviews.length ? (
                                <div className="text-right">
                                    <a 
                                        onClick={() => this.props.showReviews()}
                                        href="javascript:void(0)">
                                        <small className="main-color">
                                            View All
                                        </small>
                                    </a>
                                </div>
                            ) : null
                        }
                    </div>
                </div>
            </Fragment>
        )
    }
}