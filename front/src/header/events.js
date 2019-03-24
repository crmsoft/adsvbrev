import axios from 'axios';

const PROFILE_LOADED = 'PROFILE_LOADED';
const REDUCE_FOLLOWERS = 'REDUCE_FOLLOWERS';
const NOTIFICATIONS_VIEWED = 'NOTIFICATIONS_VIEWED';
const INCREMENT_NOTIFICATION = 'INCREMENT_NOTIFICATION';

const n_viewed = () => {
    return dispatch => dispatch({type: NOTIFICATIONS_VIEWED, data: null});
}

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

const increment_notification = () => {
    return dispatch => {
        dispatch({type: INCREMENT_NOTIFICATION, data: null});
    }
}

export {
    load_profile,
    reduce_followers,
    n_viewed,
    increment_notification,
    PROFILE_LOADED,
    REDUCE_FOLLOWERS,
    NOTIFICATIONS_VIEWED,
    INCREMENT_NOTIFICATION
};