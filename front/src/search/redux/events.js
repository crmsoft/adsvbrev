import {
    SEARCH_IN_PROGRESS,
    SEARCH_DONE,
    SEARCH_ERROR
} from './actions';
import axios from 'axios';

const progress = () => {
    return {
        type: SEARCH_IN_PROGRESS
    }
}

const error = err => {
    return {
        type: SEARCH_ERROR,
        err: err
    }
}

const done = data => {
    return {
        type: SEARCH_DONE,
        data: data
    }
}

const performSearch = (queryString) => {
    return dispatch => {
        dispatch(progress());

        axios.post(`/search${queryString}`)
        .then(response => dispatch(done(response.data.data)))
        .catch(err => dispatch(error(err)))
    }
}

export {
    performSearch
}