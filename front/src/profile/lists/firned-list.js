import React from 'react';
import {createStore, applyMiddleware} from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
                    

export const FriendListItem = ({data}) => {
    return (
        <div>
            <span>{data.name}</span>
        </div>
    )
}

// actions
const INITIAL_FETCH = 'FETCH';
const FETCH_DONE = 'FETCH_DONE';
const FETCH_MORE = 'PAGINATE';
const FETCH_ERROR = 'ERR';

// first app state
const initialState = {
    items: []
}

// reducers 
const reducer = ( state = initialState, action ) => {
    switch( action.type ){
        case INITIAL_FETCH : {
            return {
                ...action.items
            }
        }
        case FETCH_DONE : {
            return {
                items: [
                    ...state.items,
                    ...action.items
                ]
            }
        }
        case FETCH_ERROR : {
            return {
                ...state.items,
                message: action.error
            }
        }
        default: return initialState;
    }
}

// events
const fetchDone = data => {
    return { type: FETCH_DONE, items: data  }
}

const fetchErr = err => {
    return { type: FETCH_ERROR, error: err }
}

export const initialFetch = () => {
    return dispatch =>{
        fetch('/list')
            .then(response => response.json())
            .then(json => dispatch(fetchDone(json)))
            .catch(err => dispatch(fetchErr(err)))
    }  
}

const fetchMore = () => {
    return dispatch => {
        fetch('/list?page=next')
            .then(response => response.json())
            .then(json => dispatch(fetchDone(json)))
            .catch(err => dispatch(fetchErr(err)))
    }
}

const logger = createLogger();

export const store = createStore(
    reducer,
    applyMiddleware(
        thunkMiddleware,
        logger
    )
);

