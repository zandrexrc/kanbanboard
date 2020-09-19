import { KanbanBoard, KanbanCard, ReduxAction } from '../../types';
import { createEmptyKanbanCard, createEmptyKanbanBoard } from '../../utils';

type Popups = {
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
}

export const initialPopupsValues: Popups = {
    detailedCard: {
        isOpen: false,
        values: createEmptyKanbanCard(),
    },
    boardsList: {
        isOpen: false,
    },
    tagsList: {
        isOpen: false,
    },
    cardForm: {
        isOpen: false,
        values: createEmptyKanbanCard(),
    },
    boardForm: {
        isOpen: false,
        values: createEmptyKanbanBoard(),
    },
    confirmationBox: {
        isOpen: false,
        message: '',
        onConfirm: () => false,
    },
    alertBox: {
        isOpen: false,
        severity: "success",
        message: '',
    },
};


export const isFetching = (state: boolean = false, action: ReduxAction) => {
    return action.type === "SET_IS_FETCHING" ? action.payload : state;
};

export const dataIsLoaded = (state: boolean = false, action: ReduxAction) => {
    return action.type === "SET_DATA_IS_LOADED" ? action.payload : state;
}

export const activeBoardId = (state: string = '', action: ReduxAction) => {
    return action.type === "SET_ACTIVE_BOARD_ID" ? action.payload : state;
};

export const filter = (state: string | null = null, action: ReduxAction) => {
    return action.type === "SET_FILTER" ? action.payload : state;
};

export const popups = (state = initialPopupsValues, action: ReduxAction) => {
    switch (action.type) {
        case "SHOW_DETAILED_CARD":
            return { ...state, detailedCard: { isOpen: true, values: action.payload }};
        case "HIDE_DETAILED_CARD":
            return { ...state, detailedCard: { ...state.detailedCard, isOpen: false }};
        case "SHOW_BOARDS_LIST":
            return { ...state, boardsList: { isOpen: true }};
        case "HIDE_BOARDS_LIST":
            return { ...state, boardsList: { ...state.boardsList, isOpen: false }};
        case "SHOW_TAGS_LIST":
            return { ...state, tagsList: { isOpen: true }};
        case "HIDE_TAGS_LIST":
            return { ...state, tagsList: { ...state.tagsList, isOpen: false }};
        case "SHOW_CARD_FORM":
            return { ...state, cardForm: { isOpen: true, values: action.payload }};
        case "HIDE_CARD_FORM":
            return { ...state, cardForm: { ...state.cardForm, isOpen: false }};
        case "SHOW_BOARD_FORM":
            return { ...state, boardForm: { isOpen: true, values: action.payload }};
        case "HIDE_BOARD_FORM":
            return { ...state, boardForm: { ...state.boardForm, isOpen: false }};
        case "SHOW_CONFIRMATION_BOX":
            return { ...state, confirmationBox: { isOpen: true, message: action.payload.message, onConfirm: action.payload.onConfirm }};
        case "HIDE_CONFIRMATION_BOX":
            return { ...state, confirmationBox: { ...state.confirmationBox, isOpen: false }};
        case "SHOW_ALERT_BOX":
            return { ...state, alertBox: { isOpen: true, severity: action.payload.severity, message: action.payload.message }};
        case "HIDE_ALERT_BOX":
            return { ...state, alertBox: { ...state.alertBox, isOpen: false }};
        default:
            return state;
    }
};