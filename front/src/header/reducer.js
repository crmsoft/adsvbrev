
import {
    PROFILE_LOADED
} from './events';

const reducer = (state = {user:{}}, action) => {
    switch(action.type)
    {
        case PROFILE_LOADED : {
            return {
                ...action.data
            }
        }
    }
}

export default reducer;