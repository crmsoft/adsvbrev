import {
    INIT,
    USER_JOINED,
    USER_LEAVED,
    REVIEWS_HIDDEN,
    REVIEWS_SHOWN,
    REVIEW_PUSH
} from './action';

const initialState = {
    data: {
        participants: [],
        reviews_open: false,
        participant: false,
        avg_rate: 0,
        options: {},
        reviews:[],
        random: [],
        media: [],
        votes: {},
        feed: [],
        name: ``
    }
};

const reducer = (state = initialState, action) => {
    switch(action.type)
    {
        case REVIEWS_HIDDEN: {
            return {
                data: {
                    ...state.data,
                    reviews_open: false
                }   
            }
        }
        case REVIEWS_SHOWN: {
            return action.data ? {
                data: {
                    ...state.data,
                    votes: {
                        ...state.data.votes,
                        can_add_review: true
                    },
                    reviews_open: true
                }
            } : {
                data: {
                    ...state.data,
                    reviews_open: true
                }
            }
        }
        case REVIEW_PUSH: {
            return {
                data: {
                    ...state.data,
                    reviews: [
                        action.data,
                        ...state.data.reviews
                    ]
                }
            }
        }
        case INIT : {
            return {
                data: {
                    ...state.data,
                    ...action.data.data,
                    reviews_open: false
                }
            }
        }
        case USER_JOINED : {
            return {
                data : {
                    ...state.data,
                    participant: true
                }
            }
        }
        case USER_LEAVED : {
            return {
                data : {
                    ...state.data,
                    participant: false
                }
            }
        }
    } // end switch

    return initialState;
}

export default reducer;



// https://images.cf-rabota.com.ua/spa/img/skeletons/vac-list-item.svg