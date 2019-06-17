import axios from 'axios';

import {
    INIT,FORBIDDEN,
    USER_JOINED,
    USER_LEAVED
} from './action';

export const init = (group) => {
    return dispatch => {
        axios.get(`/group/show/${group}`)
        .then(({data}) => {
            dispatch({
                type: INIT,
                data: data
            });
        })
        .catch(({response}) => {            
            if(response.status == 403){
                dispatch({
                    type: FORBIDDEN,
                    data: response
                });
            } // end if
        })
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