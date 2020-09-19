import { v4 as uuidv4 } from 'uuid';
import { KanbanBoard, KanbanCard } from '../types';

export const generateId = () => uuidv4();

export const getBoardTags = (cards: KanbanCard[]) => {
    let tags: string[] = [];

    for (let i = 0; i < cards.length; i++) {
        const cardTags: string[] = cards[i].tags;

        for (let j = 0; j < cardTags.length; j++) {
            if (cardTags[j] !== "" && !tags.includes(cardTags[j])) {
                tags.push(cardTags[j]);
            }
        }
    }

    return tags;
};

export const createEmptyKanbanCard = () => {
    const card: KanbanCard = {
        id: '',
        content: '',
        status: 'Todo',
        tags: [],
    };

    return card;
}

export const createEmptyKanbanBoard = () => {
    const board: KanbanBoard = {
        id: '',
        name: '',
        color: '#d32f2f',
        cards: [],
        tags: [],
    };

    return board;
}