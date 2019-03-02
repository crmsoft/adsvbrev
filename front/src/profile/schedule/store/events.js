const EVENTS_LOADED = 'EVENTS_LOADED';
const EVENT_DAY_SELECTED = 'EVENT_DAY_SELECTED';

export {
    EVENTS_LOADED,
    EVENT_DAY_SELECTED
}

import axios from 'axios';

const load = () => {
    return dispatch => {
        axios.get(`/events`)
        .then(({data}) => {
            dispatch({type:EVENTS_LOADED, data: data});
        })
    }
}

const setDay = timestamp => {
    return dispatch => {
        dispatch({type: EVENT_DAY_SELECTED, data: timestamp})
    }
}

export {
    load,
    setDay
}