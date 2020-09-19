import { KanbanBoard, KanbanCard } from '../../types';


export const setIsFetching = (status: boolean) => ({
    type: "SET_IS_FETCHING",
    payload: status,
});

export const setDataIsLoaded = () => ({
    type: "SET_DATA_IS_LOADED",
    payload: true,
});

export const setActiveBoardId = (id: string) => ({
    type: "SET_ACTIVE_BOARD_ID",
    payload: id,
});

export const setFilter = (tag: string | null) => ({
    type: "SET_FILTER",
    payload: tag,
});

export const showDetailedCard = (card: KanbanCard) => ({
    type: "SHOW_DETAILED_CARD",
    payload: card,
});

export const hideDetailedCard = () => ({
    type: "HIDE_DETAILED_CARD",
    payload: null,
});

export const showBoardsList = () => ({
    type: "SHOW_BOARDS_LIST",
    payload: null,
});

export const hideBoardsList = () => ({
    type: "HIDE_BOARDS_LIST",
    payload: null,
});

export const showTagsList = () => ({
    type: "SHOW_TAGS_LIST",
    payload: null,
});

export const hideTagsList = () => ({
    type: "HIDE_TAGS_LIST",
    payload: null,
});

export const showCardForm = (values: KanbanCard) => ({
    type: "SHOW_CARD_FORM",
    payload: values,
});

export const hideCardForm = () => ({
    type: "HIDE_CARD_FORM",
    payload: null,
});

export const showBoardForm = (values: KanbanBoard) => ({
    type: "SHOW_BOARD_FORM",
    payload: values,
});

export const hideBoardForm = () => ({
    type: "HIDE_BOARD_FORM",
    payload: null,
});

export const showConfirmationBox = (message: string, onConfirm: () => void) => ({
    type: "SHOW_CONFIRMATION_BOX",
    payload: { message, onConfirm },
});

export const hideConfirmationBox = () => ({
    type: "HIDE_CONFIRMATION_BOX",
    payload: null,
});

export const showAlertBox = (severity: "success" | "info" | "warning" | "error" | undefined, message: string) => ({
    type: "SHOW_ALERT_BOX",
    payload: { severity, message },
});

export const hideAlertBox = () => ({
    type: "HIDE_ALERT_BOX",
    payload: null,
});