import axios from 'axios';

import {
    INIT,
    USER_JOINED,
    USER_LEAVED,
    REVIEWS_HIDDEN,
    REVIEWS_SHOWN
} from './action';

export const show_reviews = () => {
    return dispatch => {
        dispatch({
            type: REVIEWS_SHOWN,
            data: null
        });
    }
}

export const hide_reviews = () => {
    return dispatch => {
        dispatch({
            type: REVIEWS_HIDDEN,
            data: null
        });
    }
}

export const init = (group) => {
    return dispatch => {
        axios.post(`/game/show/${group}`)
        .then(({data}) => {
            dispatch({
                type: INIT,
                data: data
            });
        });
    }
}

export const join = group => {
    return dispatch => {
        axios.post(`/game/${group}/join`)
        .then(({data}) => {
            dispatch({
                type: USER_JOINED,
                data:data
            })
        })
    }
}

export const leave = group => {
    return dispatch => {
        axios.post(`/game/${group}/leave`)
        .then(({data}) => {
            dispatch({
                type: USER_LEAVED,
                data:data
            })
        })
    }
}