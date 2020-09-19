import { Action } from 'redux'
import { ThunkAction } from 'redux-thunk'

export type KanbanCard = {
    id: string,
    content: string,
    status: string,
    tags: string[],
};

export type KanbanBoard = {
    id: string,
    name: string,
    color: string,
    tags: string[],
    cards: KanbanCard[],
};

export type ReduxAction = {
    type: string,
    payload: any,
};

export type ReduxState = {
    boards: KanbanBoard[],
    isFetching: boolean,
    dataIsLoaded: boolean,
    activeBoardId: string,
    filter: string | null,
    popups: {
        detailedCard: {
            isOpen: boolean,
            values: KanbanCard,
        },
        boardsList: {
            isOpen: boolean,
        },
        tagsList: {
            isOpen: boolean,
        },
        cardForm: {
            isOpen: boolean,
            values: KanbanCard,
        },
        boardForm: {
            isOpen: boolean,
            values: KanbanBoard
        },
        confirmationBox: {
            isOpen: boolean,
            message: string,
            onConfirm: () => void,
        },
        alertBox: {
            isOpen: boolean,
            severity: "success" | "info" | "warning" | "error" | undefined,
            message: string,
        },
    },
};

export type ReduxThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    ReduxState,
    unknown,
    Action<string>
>