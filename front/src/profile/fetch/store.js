import profileReducer from './reducer';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';

const logger = createLogger();

const store = createStore(
    profileReducer,
    applyMiddleware(
        thunk,
        logger
    )
)

// const guest = createStore(
//     profileReducer,
//     applyMiddleware(
//         thunk,
//         logger
//     )
// )

export default store;

export {
    store as guest
}