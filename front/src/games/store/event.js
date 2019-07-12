import axios from 'axios';

import {
    INIT,
    USER_JOINED,
    USER_LEAVED,
    REVIEWS_HIDDEN,
    REVIEWS_SHOWN,
    REVIEW_PUSH,
    ALL_GAMERS
} from './action';

export const push_review = (review) => {
    return dispatch => {
        dispatch({
            type: REVIEW_PUSH,
            data: review
        });
    }
}

export const show_reviews = (can_add_review) => {
    return dispatch => {
        dispatch({
            type: REVIEWS_SHOWN,
            data: can_add_review
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

export const all_gamers = group => {
    return dispatch => {
        axios.get(`/game/participants/${group}`)
        .then(({data}) => {
            dispatch({
                type: ALL_GAMERS,
                data:data.data
            });
        })
    }
}