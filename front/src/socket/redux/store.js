import {
    applyMiddleware,
    createStore
} from 'redux';
import thunk from 'redux-thunk';
import {createLogger} from 'redux-logger';

import reducer from './reducer';

const _logger = new createLogger({
    collapsed: false
});

const store = createStore(
    reducer, 
    applyMiddleware(
        thunk,
        _logger
    )
);

export default store;