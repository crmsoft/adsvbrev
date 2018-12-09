import {
    INITIAL_FETCH_DONE,
    FETCH_DONE,
    FETCH_ERROR,
    FETCH_MORE,
    FETCHING
} from '../actions';

import {
    FRIENDSHIP_SUBSCRIBED,
    FRIENDSHIP_FRIENDS
} from '../../../friedship/actions';

const initialState = {
    items: [],
}

const fetchReducer = (state = initialState, action) => {
    switch(action.type){

        case FETCHING: {
            return {
                ...state,
                requestStart: true,
                update: false
            }
        }

        case FETCH_ERROR : {
            return {
                ...state,
                requestStart: false,
                err: action.message,
                update: false
            }
        }

        case FETCH_DONE: {
            return {
                items: [
                    ...state.items,
                    ...action.data
                ],
                update: false
            }
        }

        case INITIAL_FETCH_DONE : {
            return {
                items:[
                    ...action.data,
                ],
                requestStart: false,
                update: false
            }
        }

        case FRIENDSHIP_SUBSCRIBED : {
            return {
                items: state.items.filter(item => {
                    return item.username !== action.data.user;
                }),
                requestStart: false,
                update: false
            }
        }
        case FRIENDSHIP_FRIENDS : {
            return {
                ...state,
                update: true
            }
        }

        default: return state;
    }
}

export default fetchReducer;