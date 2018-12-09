import {
    INITIAL_FETCH_DONE,
    FETCH_DONE,
    FETCH_ERROR,
    FETCH_MORE,
    FETCHING
} from './actions';

const initialState = {
    items: [],
}

const fetchReducer = (state = initialState, action) => {
    switch(action.type){

        case FETCHING: {
            return {
                ...state,
                requestStart: true,
            }
        }

        case FETCH_ERROR : {
            return {
                ...state,
                requestStart: false,
                err: action.message,
            }
        }

        case FETCH_DONE: {
            return {
                items: [
                    ...state.items,
                    ...action.data
                ]
            }
        }

        case INITIAL_FETCH_DONE : {
            return {
                items:[
                    ...action.data,
                ],
                requestStart: false
            }
        }

        default: return state;
    }
}

export default fetchReducer;