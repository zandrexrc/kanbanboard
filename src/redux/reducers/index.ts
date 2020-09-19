import { combineReducers } from 'redux';
import { boards } from './boards';
import { isFetching, dataIsLoaded, activeBoardId, filter, popups, initialPopupsValues } from './ui';
import { ReduxState } from '../../types';

export const rootReducer = combineReducers({ 
    boards, 
    isFetching,
    dataIsLoaded,
    activeBoardId,
    filter,
    popups,
});

export const initialState: ReduxState = {
    boards: [],
    isFetching: false,
    dataIsLoaded: false,
    activeBoardId: '',
    filter: null,
    popups: initialPopupsValues,
};