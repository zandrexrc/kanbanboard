import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { rootReducer, initialState } from './reducers';
import { ReduxState } from '../types';

const loggerMiddleware = createLogger();

function configureStore(preloadedState: ReduxState | any = initialState) {
    return createStore(
        rootReducer,
        preloadedState,
        applyMiddleware(thunkMiddleware, loggerMiddleware)
    );
}

export { configureStore };