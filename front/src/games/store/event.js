import axios from 'axios';

import {
    INIT
} from './action';

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
            console.log(data);
        })
    }
}