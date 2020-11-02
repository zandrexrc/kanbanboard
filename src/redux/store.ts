import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { rootReducer, initialState } from './reducers';
import { ReduxState } from '../types';

// Set below to false to toggle off redux logger
const loggerIsActive = false;

const loggerMiddleware = createLogger();

function configureMiddlewares() {
    return loggerIsActive
        ? applyMiddleware(thunkMiddleware, loggerMiddleware)
        : applyMiddleware(thunkMiddleware);
}

function configureStore(preloadedState: ReduxState | any = initialState) {
    return createStore(
        rootReducer,
        preloadedState,
        configureMiddlewares()
    );
}

export { configureStore };