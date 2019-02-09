import axios from 'axios';

import {
    PROFILE_FETCH_START,
    PROFILE_FETCH_DONE,
    PROFILE_FETCH_ERROR,
    PROFILE_REFRESH
} from './actions';


const fetchStart = () =>{
    return {
        type: PROFILE_FETCH_START,
        progress: true
    }
}

const fetchDone = (data) => {
    return {
        type: PROFILE_FETCH_DONE,
        progress: false,
        data: data
    }
}

const fetchErr = (err) => {
    return {
        type: PROFILE_FETCH_ERROR,
        error: err,
        progress: false
    }
}

const updateProfile = (newState) => {
    return {
        type: PROFILE_REFRESH,
        data: newState
    }
}

const fetchProfile = () => {
    return dispatch => {
        
        dispatch(fetchStart());

        axios.get('/get/profile')
        .then(({data}) => dispatch(fetchDone(data)))
        .catch(err => dispatch(fetchErr(err)))        
    };
}

const fetchGamerProfile = ( username ) => {
    return dispatch => {
        
        dispatch(fetchStart());

        axios.get(`/get/profile/${username}`)
        .then(({data}) => dispatch(fetchDone(data)))
        .catch(err => dispatch(fetchErr(err)))        
    };
}

export {
    fetchProfile,
    updateProfile,
    fetchGamerProfile
}