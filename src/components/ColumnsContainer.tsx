import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Column } from './Column';
import { KanbanCard } from '../types';

const useStyles = makeStyles({
    root: {
        width: '700px',
        height: '380px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        backgroundImage: "url('/background.jpg')",
        backgroundSize: '100%',
        backgroundPosition: 'bottom',
        border: '10px solid #fff',
        "& .columns": {
            width: '680px',
            height: '380px',
            padding: '0 10px',
            overflow: 'hidden',
            display: 'flex',
            justifyContent: 'space-evenly',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.1)',
        }
    }
});


type ColumnsContainerProps = {
    boardColor: string,
    boardId: string,
    todoCards: KanbanCard[],
    doingCards: KanbanCard[],
    doneCards: KanbanCard[],
};


function ColumnsContainer({ boardColor, boardId, todoCards, doingCards, doneCards }: ColumnsContainerProps) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <div className={"columns"}>
                <Column 
                    title="Todo" 
                    cards={ todoCards } 
                    boardColor={boardColor} 
                    boardId={boardId} 
                />
                <Column 
                    title="Doing" 
                    cards={ doingCards } 
                    boardColor={boardColor} 
                    boardId={boardId} 
                />
                <Column 
                    title="Done" 
                    cards={ doneCards } 
                    boardColor={boardColor} 
                    boardId={boardId} 
                />
            </div>
        </div>
    )
}

export { ColumnsContainer };