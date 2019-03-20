import {
    FETCH_DONE,
    USER_JOIN,
    USER_LEAVE,
    FETCH_PARTICIPANTS
} from './event';

const reducer = (state, action) => {
    switch(action.type)
    {
        case FETCH_DONE : {
            return {
                ...action.data
            }
        }
        case USER_JOIN : {
            return {
                ...state,
                user_participant: true
            }
        }
        case USER_LEAVE: {
            return {
                ...state,
                user_participant: false
            }
        }
        case FETCH_PARTICIPANTS : {
            return {
                ...state,
                participants: [
                    ...action.data.data
                ]   
            }
        }
        default: return {...state}
    }
}

export default reducer;