import fetch from 'cross-fetch';
import { setActiveBoardId,setDataIsLoaded, setIsFetching, showAlertBox } from './ui';
import { KanbanBoard, KanbanCard, ReduxThunk } from '../../types';

// Boards
export const loadBoards = (): ReduxThunk => 
    async (dispatch, getState) => {
        if (!getState().isFetching) {
            dispatch(setIsFetching(true));
            try {
                const res = await fetch('/data');
                if (res.status >= 400) {
                    throw res;
                }

                const payload = await res.json();
                dispatch({
                    type: "LOAD_BOARDS",
                    payload: payload
                });
                dispatch(setIsFetching(false));
                dispatch(setActiveBoardId(payload[0] ? payload[0].id : ''))
                dispatch(setDataIsLoaded());
            }
            catch (error) {
                dispatch(showAlertBox("error", "Failed to load data"));
            }
        }
    }

export const saveBoards = (boards: KanbanBoard[]): ReduxThunk => 
    async (dispatch, getState) => {
        if (!getState().isFetching) {
            dispatch(setIsFetching(true));
            try {
                const res = await fetch(
                    '/data',
                    {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(boards)
                    }
                );

                if (res.status >= 400) {
                    throw res;
                }

                dispatch(setIsFetching(false));
                dispatch(showAlertBox("success", "Successfully saved data"));
            }
            catch (error) {
                dispatch(showAlertBox("error", "Failed to save data"));
            }
        }
    }

export const addBoard = (board: KanbanBoard) => ({
    type: "ADD_BOARD",
    payload: board,
});

export const editBoard = (boardId: string, board: KanbanBoard) => ({
    type: "EDIT_BOARD",
    payload: { boardId, board },
});

export const deleteBoard = (boardId: string) => ({
    type: "DELETE_BOARD",
    payload: boardId,
});

// Cards
export const addCard = (boardId: string, card: KanbanCard) => ({
    type: "ADD_CARD",
    payload: { boardId, card },
});

export const editCard = (boardId: string, card: KanbanCard) => ({
    type: "EDIT_CARD",
    payload: { boardId, card },
});

export const deleteCard = (boardId: string, cardId: string) => ({
    type: "DELETE_CARD",
    payload: { boardId, cardId },
});