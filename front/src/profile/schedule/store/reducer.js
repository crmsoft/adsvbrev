import {
    EVENTS_LOADED,
    EVENT_DAY_SELECTED
} from './events';

const reducer = (state = {data:[], ready: false}, action) => {
    switch (action.type)
    {
        case EVENTS_LOADED : return {
            ...action.data,
            ready: true
        }
        case EVENT_DAY_SELECTED : {
            return {
                ...state,
                describe: action.data
            }
        }
        default: return {
            ...state
        }
    }
}

export default reducer;