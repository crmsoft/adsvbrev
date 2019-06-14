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
        options: {},
        random: [],
        media: [],
        feed: [],
        name: ``
    }
};

const reducer = (state = initialState, action) => {
    switch(action.type)
    {
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