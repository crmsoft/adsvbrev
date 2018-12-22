import {createStore, applyMiddleware} from 'redux';
import redux from 'redux-thunk';
import reducer from './reducer';
import {createLogger} from 'redux-logger';

const logger = createLogger();

const store = createStore(
    reducer,
    applyMiddleware(
        redux,
        logger
    )
);

export default store;