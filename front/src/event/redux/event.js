import axios from 'axios';
import { POST_ADDED } from '../../post-add/redux/actions';


const LOADING = 'LOADING';
const FETCH_DONE = 'FETCH_DONE';
const USER_JOIN = 'USER_JOIN';
const USER_LEAVE = 'USER_LEAVE';
const FETCH_PARTICIPANTS = 'FETCH_PARTICIPANTS';

const leave = event => {
    return dispatch => {
        axios.post(`/event/leave/${event}`)
        .then(({data}) => {
            dispatch({
                type: USER_LEAVE
            })
        })
    }
}

const join = event => {
    return dispatch => {
        axios.post(`/event/join/${event}`)
        .then(({data}) => {
            dispatch({
                type: USER_JOIN
            })
        })
    }
}

const load = event => {
    return dispatch => {
        dispatch({type: LOADING});
        axios.get(`/event/show/${event}`)
        .then(({data}) => {
            dispatch({
                type: FETCH_DONE,
                data: data.data
            })
        });
    }
}

const loadParticipants = event => {
    return dispatch => {
        axios.get(`/event/participants/${event}`)
        .then(({data}) => {
            dispatch({
                type: FETCH_PARTICIPANTS,
                data: data
            })
        })
    }
}

const postAdded = post => {
    return dispatch => {
        dispatch({
            type: POST_ADDED,
            data: post
        })   
    }
}

export {
    load,
    join,
    leave,
    loadParticipants,
    postAdded,
    FETCH_DONE,
    USER_JOIN,
    USER_LEAVE,
    FETCH_PARTICIPANTS
}