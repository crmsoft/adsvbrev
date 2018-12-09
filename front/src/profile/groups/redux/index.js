import axios from 'axios';

const INITIAL_FETCH_DONE = 'INITIAL_FETCH';
const FETCH_MORE = 'FETCH_MORE';
const FETCH_ERROR = 'FETCH_ERROR';
const FETCHING = 'FETCHING';
const FETCH_DONE = 'FETCH_DONE';

// EVENTS
const fetchErr = err => {
    return { type: FETCH_ERROR, action: {message:err} };
}

const fetchStart = () => {
    return { type: FETCHING };
}

const fetchDone = ({data}) => {
    return { type: FETCH_DONE, data: data };
}

const fetchedInitial = ({data}) => {
    return {type: INITIAL_FETCH_DONE, data:data}
}

const intialFetch = user => {
    const url = user ? `/friend/list/${user}` : `/friend/list`;
    return dispatch => {
        
        dispatch(fetchStart());

        axios.get(url)
        .then(data => dispatch(fetchedInitial(data)))
        .catch(err => dispatch(fetchErr(err)))        
    };
}

const moreFetch = () => {
    return dispatch => {
        
        dispatch(fetchStart());

        axios.get('/friend/list')
        .then(data => dispatch(fetchDone(data)))
        .catch(err => dispatch(fetchErr(err)))        
    };
}

export {
    INITIAL_FETCH_DONE,
    FETCH_DONE,
    FETCH_ERROR,
    FETCH_MORE,
    FETCHING,
    intialFetch,
    moreFetch,
    fetchedInitial,
    fetchDone,
    fetchErr,
    fetchStart
}