import axios from 'axios';

import {
    INIT,
    USER_JOINED,
    USER_LEAVED
} from './action';

export const init = (group) => {
    return dispatch => {
        axios.post(`/group/show/${group}`)
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
        axios.post(`/group/${group}/join`)
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
        axios.post(`/group/${group}/leave`)
        .then(({data}) => {
            dispatch({
                type: USER_LEAVED,
                data:data
            })
        })
    }
}