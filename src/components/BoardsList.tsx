import React from 'react';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import {
    Button, 
    Card, 
    CardActions,
    CardHeader, 
    Dialog,
    IconButton,
    List, 
    ListItem, 
    ListItemText,
    ListItemSecondaryAction,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { Scrollbars } from 'react-custom-scrollbars';
import { KanbanBoard } from '../types';
import { deleteBoard } from '../redux/actions/boards';
import { 
    hideBoardsList, 
    hideConfirmationBox, 
    setActiveBoardId,
    showAlertBox, 
    showBoardForm, 
    showConfirmationBox 
} from '../redux/actions/ui';
import { createEmptyKanbanBoard } from '../utils';

const useStyles = makeStyles({
    root: {
        width: 400,
        height: 300,
        overflow: 'hidden',
        backgroundColor: 'rgba(255, 255, 255, 1)',
        position: 'relative',
        zIndex: 9,
        "& .header": {
            height: 29,
            padding: '7px 20px 3px 20px',
            backgroundColor: '#f8f8f8',
            borderBottom: '1px solid #ddd',
            "& .buttons": {
                height: '36px',
                paddingTop: '3px',
                display: 'flex',
                alignItems: 'center',
            }
        },
        "& .list": {
            width: '100%',
            height: 200,
            padding: 0,
            display: 'flex',
            flexFlow: 'column nowrap',
            justifyContent: 'flex-start',
            alignItems: 'center',
            borderBottom: '1px solid #ddd',
            "& .MuiListItem-root": {
                width: 400,
                color: '#fff',
                borderBottom: '1px solid #fff',
                "&:hover": {
                    opacity: 0.8,
                },
            },
            "& .MuiIconButton-root": {
                color: '#fff',
            },
            "& .MuiIconButton-root:hover": {
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
            }
        },
        "& .footer": {
            padding: '14px 20px',
            backgroundColor: '#f8f8f8',
        },
    },
});


type BoardsListProps = {
    isOpen: boolean,
    boards: KanbanBoard[],
};


function BoardsList({ isOpen, boards }: BoardsListProps) {
    const dispatch = useDispatch();
    const classes = useStyles();

    const changeBoard = (id: string) => {
        dispatch(setActiveBoardId(id));
        dispatch(hideBoardsList());
    }

    const confirmDeleteBoard = (boardId: string) => {
        const updatedBoards = boards.filter(b => b.id !== boardId);
        updatedBoards.length >= 1 ? 
            dispatch(setActiveBoardId(boards[0].id)) :
            dispatch(setActiveBoardId(''));
        dispatch(deleteBoard(boardId));
        dispatch(hideBoardsList());
        dispatch(hideConfirmationBox());
        dispatch(showAlertBox("success", "Board has been deleted"));
    }

    return (
        <Dialog open={isOpen} onClose={() => dispatch(hideBoardsList())}>
            <Card className={classes.root} elevation={1}>
                <CardHeader 
                    className="header"
                    title="Boards"
                    titleTypographyProps={{variant: 'h6'}}
                />
                <List className="list">
                    <Scrollbars autoHide>
                        { boards.map((board, index) => (
                            <ListItem 
                                key={index} 
                                button 
                                style={{ backgroundColor: board.color }}
                                onClick={() => changeBoard(board.id)}
                            >
                                <ListItemText primary={ board.name } />
                                <ListItemSecondaryAction>
                                    <IconButton 
                                        edge="end" 
                                        size="small"
                                        onClick={() => dispatch(showBoardForm(board))}
                                    >
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton 
                                        edge="end" 
                                        size="small"
                                        onClick={() => dispatch(showConfirmationBox(
                                            'Delete this board?',
                                            () => confirmDeleteBoard(board.id)
                                        ))}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </ListItemSecondaryAction>
                            </ListItem>
                        )) }
                    </Scrollbars>
                </List>
                <CardActions className="footer">
                    <Button 
                        fullWidth 
                        color="primary" 
                        variant="contained" 
                        disableElevation
                        onClick={() => dispatch(showBoardForm(createEmptyKanbanBoard()))} 
                    >
                        Add new board
                    </Button>
                </CardActions>
            </Card>
        </Dialog>
    );
}

export { BoardsList };