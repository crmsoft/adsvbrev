import {createStore, applyMiddleware} from 'redux';
import { createLogger } from 'redux-logger';
import redux from 'redux-thunk';

import reducer from './reducer';

const logger = createLogger({
    collapsed: false
})

const store = createStore(
    reducer,
    applyMiddleware(
        redux,
        logger
    )
)

export default store;