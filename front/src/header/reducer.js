
import {
    PROFILE_LOADED,
    REDUCE_FOLLOWERS,
    NOTIFICATIONS_VIEWED,
    INCREMENT_NOTIFICATION
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
        case INCREMENT_NOTIFICATION : {
            return {
                ...state,
                notifications: state.notifications + 1
            }
        }
        default: return {
            ...state
        }
    }
}

export default reducer;