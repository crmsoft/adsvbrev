import fetchReducer from '../reducesrs';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';

const logger = createLogger();

const store = createStore(
    fetchReducer,
    applyMiddleware(
        thunkMiddleware,
        logger
    )
)

export default store;