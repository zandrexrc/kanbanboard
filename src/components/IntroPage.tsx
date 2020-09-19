import React from 'react';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Typography } from '@material-ui/core';
import { showBoardForm } from '../redux/actions/ui';
import { createEmptyKanbanBoard } from '../utils';

const useStyles = makeStyles({
    root: {
        width: '720px',
        height: '440px',
        display: 'flex',
        flexFlow: 'column noWrap',
        justifyContent: 'center',
        alignItems: 'center',
        "& .header": {
            width: '700px',
            minHeight: '39px',
            maxHeight: '39px',
            padding: '0 10px',
            borderBottom: '1px solid #ddd',
            backgroundColor: '#f8f8f8',
        },
        "& .content": {
            width: '700px',
            height: '380px',
            display: 'flex',
            flexFlow: 'column noWrap',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#fff',
            border: '10px solid #fff',
        }
    }
});


function IntroPage() {
    const dispatch = useDispatch();
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <div className="header"></div>
            <div className="content">
                <Typography variant="h6" gutterBottom>
                    No boards found.
                </Typography>
                <Button
                    color="primary" 
                    variant="contained" 
                    disableElevation
                    onClick={() => dispatch(showBoardForm(createEmptyKanbanBoard()))} 
                >
                    Create board
                </Button>
            </div>
        </div>
    )
}

export { IntroPage };