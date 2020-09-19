import React from 'react';
import { useDispatch } from 'react-redux';
import { Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import { hideAlertBox } from '../redux/actions/ui';


type AlertBoxProps = {
    isOpen: boolean,
    severity: "success" | "info" | "warning" | "error" | undefined,
    message: string,
};


function AlertBox({ isOpen, severity, message }: AlertBoxProps) {
    const dispatch = useDispatch();

    return (
        <Snackbar 
            open={isOpen} 
            autoHideDuration={3000} 
            onClose={() => dispatch(hideAlertBox())}
        >
            <MuiAlert 
                variant="filled"
                severity={severity} 
                onClose={() => dispatch(hideAlertBox())}
            >
                {message}
            </MuiAlert>
        </Snackbar>
    )
}

export { AlertBox };