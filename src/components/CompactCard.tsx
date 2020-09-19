import React from 'react';
import { useDispatch } from 'react-redux';
import { useDrag, DragSourceMonitor } from 'react-dnd'
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardActions, CardContent, Typography } from '@material-ui/core';
import { KanbanCard } from '../types';
import { editCard } from '../redux/actions/boards';
import { showDetailedCard } from '../redux/actions/ui';

const useStyles = makeStyles({
    root: {
        width: 200,
        height: 100,
        overflow: 'hidden',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        cursor: 'pointer',
        "&:hover": {
            backgroundColor: 'rgba(255, 255, 255, 1)',
        },
        "& .content": {
            height: 50,
            padding: 10,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            "& .text": {
                width: '100%',
                height: 'auto',
                display: '-webkit-box',
                WebkitBoxOrient: 'vertical',
                WebkitLineClamp: 2,
                overflow: 'hidden',
            }
        },
        "& .footer": {
            height: 10,
            padding: 10,
            overflow: 'hidden',
            color: '#fff',
        },
    }
});

type CompactCardProps = {
    card: KanbanCard, 
    boardColor: string,
    boardId: string,
};


function CompactCard({ card, boardColor, boardId }: CompactCardProps) {
    const dispatch = useDispatch();
    const classes = useStyles();

    const [{ isDragging }, drag] = useDrag({
        item: { card, type: 'CompactCard' },
        end: (item: { card: KanbanCard } | undefined, monitor: DragSourceMonitor) => {
            const dropResult = monitor.getDropResult()
            if (item && dropResult) {
                const updatedCard = { ...item.card, status: dropResult.columnName };
                dispatch(editCard(boardId, updatedCard));
            }
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    })

    return (
        <Card 
            ref={drag}
            className={classes.root} 
            elevation={1} 
            onClick={() => dispatch(showDetailedCard(card))}
            style={{opacity: isDragging ? 0.5 : 1}}
        >
            <CardContent className="content">
                <Typography variant="body1" className="text">
                    { card.content }
                </Typography>
            </CardContent>
            <CardActions className="footer" style={{backgroundColor: boardColor}}>
                { card.tags.map((tag, index) => (
                    <Typography key={index} variant="body2">
                        { tag }
                    </Typography>
                ))}
            </CardActions>
        </Card>
    )
}

export { CompactCard };