import {
    PROFILE_FETCH_DONE,
    PROFILE_FETCH_START,
    PROFILE_FETCH_ERROR,
    PROFILE_REFRESH
} from './actions';

const initialState = {
    info: {
        friends: [],
        groups:[],
        feed:[],
        profile: { ava : '', user:{} }
    },
    totals: {}
};

const profileReducer = (state = initialState, action) => {
    switch(action.type){
        case PROFILE_REFRESH : {
            const a = Object.assign({}, state);
            a.info.profile.main_photo = action.data;
            return {
                ...a,
                poof: Math.random()  
            };
        }
        case PROFILE_FETCH_DONE: {
            return {
                ...action.data,
                fetching: false
            }
        }
        case PROFILE_FETCH_ERROR : {
            return {
                ...state,
                error: action.error
            }
        }
        case PROFILE_FETCH_START : {
            return {
                ...state,
                fetching: true,
            }
        }
        default: {
            return state;
        }
    }
}

export default profileReducer;