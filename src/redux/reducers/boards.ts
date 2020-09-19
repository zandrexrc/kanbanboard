import { KanbanBoard, KanbanCard, ReduxAction } from '../../types';
import { getBoardTags } from '../../utils';


const editBoard = (boards: KanbanBoard[], boardId: string, newBoard: KanbanBoard) => {
    const updatedBoards = [ ...boards ];
    const boardIndex = updatedBoards.findIndex(board => board.id === boardId);
    updatedBoards[boardIndex] = newBoard;
    return updatedBoards;
};

const addCard = (boards: KanbanBoard[], boardId: string, newCard: KanbanCard) => {
    const updatedBoards = [ ...boards ];
    const boardIndex = updatedBoards.findIndex(board => board.id === boardId);

    // Update cards
    updatedBoards[boardIndex].cards = [ ...updatedBoards[boardIndex].cards, newCard ];

    // Update tags
    updatedBoards[boardIndex].tags = getBoardTags(updatedBoards[boardIndex].cards);
    return updatedBoards;
};

const editCard = (boards: KanbanBoard[], boardId: string, newCard: KanbanCard) => {
    const updatedBoards = [ ...boards ];
    const boardIndex = updatedBoards.findIndex(board => board.id === boardId);

    // Update cards
    const cardIndex = updatedBoards[boardIndex].cards.findIndex(card => card.id === newCard.id);
    updatedBoards[boardIndex].cards[cardIndex] = newCard;

    // Update tags
    updatedBoards[boardIndex].tags = getBoardTags(updatedBoards[boardIndex].cards);
    return updatedBoards;
};

const deleteCard = (boards: KanbanBoard[], boardId: string, cardId: string) => {
    const updatedBoards = [ ...boards ];
    const boardIndex = updatedBoards.findIndex(board => board.id === boardId);

    // Update cards
    updatedBoards[boardIndex].cards = updatedBoards[boardIndex].cards.filter(card => card.id !== cardId);

    // Update tags
    updatedBoards[boardIndex].tags = getBoardTags(updatedBoards[boardIndex].cards);
    return updatedBoards;
};


export const boards = (state: KanbanBoard[] = [], action: ReduxAction | any) => {
    switch (action.type) {
        case "LOAD_BOARDS":
            return action.payload;
        case "ADD_BOARD":
            return [ ...state, action.payload ];
        case "EDIT_BOARD":
            return editBoard(state, action.payload.boardId, action.payload.board);
        case "DELETE_BOARD":
            return state.filter(board => board.id !== action.payload);
        case "ADD_CARD":
            return addCard(state, action.payload.boardId, action.payload.card);
        case "EDIT_CARD":
            return editCard(state, action.payload.boardId, action.payload.card);
        case "DELETE_CARD":
            return deleteCard(state, action.payload.boardId, action.payload.cardId);
        default:
            return state;
    }
};