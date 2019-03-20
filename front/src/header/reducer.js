
import {
    PROFILE_LOADED,
    REDUCE_FOLLOWERS,
    NOTIFICATIONS_VIEWED
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
        case NOTIFICATIONS_VIEWED : {
            return {
                ...state,
                notifications: 0
            }
        }
        default: return {
            ...state
        }
    }
}

export default reducer;