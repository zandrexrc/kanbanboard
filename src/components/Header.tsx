import React from 'react';
import { useDispatch } from 'react-redux';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { IconButton, Paper, Toolbar, Tooltip, Typography } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import TuneIcon from '@material-ui/icons/Tune';
import SaveIcon from '@material-ui/icons/Save';
import StopIcon from '@material-ui/icons/Stop';
import { saveBoards } from '../redux/actions/boards';
import { showBoardsList, showCardForm, showTagsList } from '../redux/actions/ui';
import { KanbanBoard } from '../types';
import { createEmptyKanbanCard } from '../utils';

const useStyles = makeStyles({
    root: {
        width: '700px',
        minHeight: '39px',
        maxHeight: '39px',
        padding: '0 10px',
        borderBottom: '1px solid #ddd',
        backgroundColor: '#f8f8f8',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        "& .boardName": {
            display: 'flex',
            alignItems: 'center',
            padding: '0 10px 0 0',
            border: '1px solid #ddd',
            borderRadius: '5px',
            cursor: 'pointer',
            transition: 'all 0.2s ease-in-out',
            "&:hover": {
                backgroundColor: 'rgba(0, 0, 0, 0.05)'
            }
        },
    },
});

const CustomTooltip = withStyles({
    tooltip: {
        fontSize: 11,
        color: '#fff'
    }
})(Tooltip);


type HeaderProps = {
    boardColor: string,
    boardName: string,
    boards: KanbanBoard[],
};


function Header({boardColor, boardName, boards}: HeaderProps) {
    const dispatch = useDispatch();
    const classes = useStyles();

    return (
        <Toolbar className={classes.root}>
            <CustomTooltip arrow title="Change board" placement="top">
                <Paper 
                    className={"boardName"} 
                    elevation={0} 
                    onClick={() => dispatch(showBoardsList())}
                >
                    <StopIcon style={{color: boardColor}} />
                    <Typography variant="h6">
                        { boardName }
                    </Typography>
                </Paper>
            </CustomTooltip>
            <div>
                <CustomTooltip arrow title="Add new card" placement="top">
                    <IconButton 
                        size="small" 
                        onClick={() => dispatch(showCardForm(createEmptyKanbanCard()))}
                    >
                        <AddIcon fontSize="small" />
                    </IconButton>
                </CustomTooltip>
                <CustomTooltip arrow title="Filter by tag" placement="top">
                    <IconButton 
                        size="small" 
                        onClick={() => dispatch(showTagsList())}
                    >
                        <TuneIcon fontSize="small" />
                    </IconButton>
                </CustomTooltip>
                <CustomTooltip arrow title="Save state" placement="top">
                    <IconButton 
                        size="small" 
                        onClick={() => dispatch(saveBoards(boards))}
                    >
                        <SaveIcon fontSize="small" />
                    </IconButton>
                </CustomTooltip>
            </div>
        </Toolbar>
    )
}

export { Header };