import {
    SEARCH_IN_PROGRESS,
    SEARCH_DONE,
    SEARCH_ERROR
} from './actions';

const defaultState = {
    items: []
};

const reducer = ( state = defaultState, action) => {
    switch(action.type){
        case SEARCH_IN_PROGRESS : {
            return {
                ...state,
                processing: true
            }   
        }
        case SEARCH_DONE : {
            return {
                ...state,
                processing: false,
                items: [
                    ...action.data
                ]
            }
        }
        case SEARCH_ERROR : {
            return {
                ...state,
                processing: false,
                err: action.err
            }
        }
        default : return state;
    }
}

export default reducer;