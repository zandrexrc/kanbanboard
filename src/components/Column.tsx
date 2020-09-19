import React from 'react';
import { useDrop } from 'react-dnd';
import { makeStyles } from '@material-ui/core/styles';
import { List, ListItem, Paper, Typography } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { Scrollbars } from 'react-custom-scrollbars';
import { CompactCard } from './CompactCard';
import { KanbanCard } from '../types';

const useStyles = makeStyles({
    root: {
        width: 200,
        height: 300,
        display: 'flex',
        flexFlow: 'column noWrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'relative',
        "& .header": {
            width: 'calc(100% - 20px)',
            height: 30,
            padding: '0 10px',
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
            backgroundColor: '#f8f8f8'
        },
        "& .cards": {
            width: '100%',
            height: 260,
            padding: 0,
            overflow: 'auto',
            zIndex: 2,
            "& .MuiListItem-root": {
                padding: 0,
                marginBottom: 5,
            }
        },
        "& .dropzone": {
            width: '100%',
            height: 260,
            padding: 0,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            bottom: 0,
            zIndex: 1,
            color: '#333',
            backgroundColor: '#f8f8f8',
            borderRadius: 4,
        },
    }
});


type ColumnProps = {
    title: string,
    cards: KanbanCard[],
    boardColor: string,
    boardId: string,
};


function Column({ title, cards, boardColor, boardId }: ColumnProps) {
    const classes = useStyles();

    const [{ canDrop, isOver }, drop] = useDrop({
        accept: 'CompactCard',
        canDrop: (item, monitor) => item && monitor.getItem().card.status !== title,
        drop: () => ({ columnName: title }),
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
    })

    let dropzoneOpacity = 0;
    let cardsOpacity = 1;
    if (canDrop && isOver) {
        dropzoneOpacity = 0.5;
        cardsOpacity = 0.8;
    } else if (canDrop) {
        dropzoneOpacity = 1;
        cardsOpacity = 0;
    }

    return (
        <div ref={drop} className={classes.root}>
            <Paper className="header" elevation={1}>
                <Typography variant="h6">
                    { title }
                </Typography>
            </Paper>
            <List 
                className="cards"
                style={{opacity: cardsOpacity}}
            >
                <Scrollbars autoHide hideTracksWhenNotNeeded>
                    { cards.map((card, index) => (
                        <ListItem key={index}>
                            <CompactCard 
                                card={card} 
                                boardColor={boardColor} 
                                boardId={boardId} 
                            />
                        </ListItem>
                    ))}
                </Scrollbars>
            </List>
            <div className="dropzone" style={{opacity: dropzoneOpacity}}>
                <AddIcon />
            </div>
        </div>
    )
}

export { Column };