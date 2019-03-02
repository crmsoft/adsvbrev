import reducer from './reducer';
import {createLogger} from 'redux-logger';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

const logger = createLogger({
    collapsed: true
});

const store = createStore(
    reducer,
    applyMiddleware(
        thunk,
        logger
    )
)

export default store;