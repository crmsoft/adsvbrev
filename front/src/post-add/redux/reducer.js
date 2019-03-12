import {
    POST_ADDED
} from './actions';

const reducer = (state = null, action) => {
    switch(action.type)
    {
        case POST_ADDED : {
            return {
                ...action.data
            }
        }
    } // end switch

    return state;
}

export default reducer;