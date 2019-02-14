import axios from 'axios';

const PROFILE_LOADED = 'PROFILE_LOADED';
const REDUCE_FOLLOWERS = 'REDUCE_FOLLOWERS';


const load_profile = () => {
    return dispatch => {
        axios.post('/profile')
        .then(response => dispatch({type: PROFILE_LOADED, data: response.data}));
    }    
}

const reduce_followers = () => {
    return dispatch => {
        dispatch({type: REDUCE_FOLLOWERS, data: null});
    }
}

export {
    load_profile,
    reduce_followers,
    PROFILE_LOADED,
    REDUCE_FOLLOWERS
};