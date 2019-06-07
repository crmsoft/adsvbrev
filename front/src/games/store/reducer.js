import {
    INIT,
    USER_JOINED,
    USER_LEAVED,
    REVIEWS_HIDDEN,
    REVIEWS_SHOWN
} from './action';

const initialState = {
    data: {
        name: ``,
        participants: [],
        random: [],
        feed: [],
        media: [],
        participant: false,
        options: {},
        votes:{},
        reviews:[],
        reviews_open: false
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
            return {
                data: {
                    ...state.data,
                    reviews_open: true
                }
            }
        }
        case INIT : {
            return {
                data: {
                    ...state.data,
                    ...action.data.data
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