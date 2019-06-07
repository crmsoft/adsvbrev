import React, {Component} from 'react';

import AddReview from './AddReview';
import Filter, {FILTER_BEST} from './Filter';
import {ReviewList} from './Comment';

export default class ReviewFeed extends Component {

    state = {
        show: FILTER_BEST,
        list: []
    }

    static getDerivedStateFromProps(props, state)
    {
        if (!state.list.length)
        {
            return {
                list: props.reviews
            }
        }

        return null;
    }

    setFilter(type)
    {
        this.setState(() => {
            return {
                show: type
            }
        })
    }

    updateLike(id)
    {
        let {list} = this.state;

        for (let index = 0; index < list.length; index++) {
            if(list[index].id === id)
            {
                if(list[index].likes)
                {
                    list[index].like_count--;
                } else {
                    list[index].like_count++;
                }

                list[index].likes = !list[index].likes;
            }
        }

        this.setState(() => {
            return {
                list: list
            }
        })
    }

    render()
    {        
        const {can_add_review} = this.props.vote;
        const {show, list} = this.state;

        return (
            <div className="review-feed">
                <AddReview 
                    available={can_add_review}
                    game={this.props.id}
                />
                <hr />
                <Filter
                    active={show}
                    onFilter={this.setFilter.bind(this)}
                />
                <ReviewList 
                    className="d-none"
                    list={Filter.filterReviews(show, list)}
                    updateLike={this.updateLike.bind(this)}
                />
            </div>
        )
    }
}