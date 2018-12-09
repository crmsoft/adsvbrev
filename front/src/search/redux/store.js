import reducer from './reducer';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';

const logger = createLogger();

const searchStore = createStore(
    reducer,
    applyMiddleware(
        thunk,
        logger
    )
)

export default searchStore;