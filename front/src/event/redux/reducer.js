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
                random: (action.data && state.random.length < 6) ? [...state.random, action.data] : state.random,
                user_participant: true,
                user_participant_as: action.as === 'interested' ? 'interested':'attends',
                total_participant: action.data ? (state.total_participant + 1) : state.total_participant 
            }
        }
        case USER_LEAVE: {
            return {
                ...state,
                user_participant: false,
                user_participant_as: null,
                random: (action.data && state.random.length) ? state.random.filter(u => u.username !== action.data.username) : state.random,
                total_participant: action.data ? (state.total_participant - 1) : state.total_participant 
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
