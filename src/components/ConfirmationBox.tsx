import React from 'react';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { 
    Button, 
    Dialog, 
    DialogActions, 
    DialogContent, 
    DialogContentText,  
    DialogTitle,
} from '@material-ui/core';
import { hideConfirmationBox } from '../redux/actions/ui';

const useStyles = makeStyles({
    root: {
        "& .MuiDialog-paper": {
            width: 400,
            "& .MuiDialogTitle-root": {
                padding: '10px 20px',
                backgroundColor: '#f8f8f8',
            }
        }
    },
});


type ConfirmationBoxProps = {
    isOpen: boolean,
    message: string,
    onConfirm: () => void,
};


function ConfirmationBox({ isOpen, message, onConfirm }: ConfirmationBoxProps) {
    const dispatch = useDispatch();
    const classes = useStyles();

    return (
        <Dialog
            open={isOpen}
            onClose={() => dispatch(hideConfirmationBox())}
            className={classes.root}
        >
            <DialogTitle>
                Alert
            </DialogTitle>
            <DialogContent dividers>
                <DialogContentText>
                    { message }
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button 
                    color="primary" 
                    variant="contained" 
                    disableElevation
                    onClick={() => dispatch(hideConfirmationBox())}
                >
                    Cancel
                </Button>
                <Button
                    color="primary" 
                    variant="contained" 
                    disableElevation
                    onClick={onConfirm}
                >
                    Confirm
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export { ConfirmationBox };