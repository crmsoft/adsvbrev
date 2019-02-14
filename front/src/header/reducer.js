
import {
    PROFILE_LOADED,
    REDUCE_FOLLOWERS
} from './events';

const reducer = (state = {data: {user:{}}}, action) => {
    switch(action.type)
    {
        case REDUCE_FOLLOWERS : {
            return {
                ...state,
                followers: state.followers - 1
            }
        } 
        case PROFILE_LOADED : {
            return {
                ...action.data
            }
        }
        default: return {
            ...state
        }
    }
}

export default reducer;