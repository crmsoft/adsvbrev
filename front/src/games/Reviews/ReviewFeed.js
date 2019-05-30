import React, {Component} from 'react';
import AddReview from './AddReview';
import Filter from './Filter';


export default class ReviewFeed extends Component {

    render()
    {
        return (
            <div className="review-feed">
                <AddReview />
                <hr />
                <Filter />
            </div>
        )
    }
}