import React from 'react';
import { useDispatch } from 'react-redux';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { 
    Card, 
    CardActions, 
    CardContent, 
    Dialog, 
    IconButton, 
    TextField, 
    Tooltip, 
    Typography 
} from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import { CirclePicker } from 'react-color';
import { KanbanBoard } from '../types';
import { addBoard, editBoard } from '../redux/actions/boards';
import { hideBoardForm, setActiveBoardId, showAlertBox } from '../redux/actions/ui';
import { generateId } from '../utils';


const useStyles = makeStyles({
    root: {
        width: 400,
        height: 240,
        overflow: 'hidden',
        backgroundColor: 'rgba(255, 255, 255, 1)',
        "& .header": {
            height: 29,
            padding: '7px 15px 3px 20px',
            backgroundColor: '#f8f8f8',
            borderBottom: '1px solid #ddd',
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
            "& .buttons": {
                height: '36px',
                display: 'flex',
                alignItems: 'center',
            }
        },
        "& .textField": {
            padding: '12px 20px 20px 20px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderBottom: '1px solid #ddd',
        },
        "& .colorPicker": {
            width: '100%',
            height: '140px',
            padding: '0',
            display: 'flex',
            flexFlow: 'column noWrap',
            justifyContent: 'center',
            alignItems: 'center',
            "& .text": {
                width: '330px',
                marginBottom: '10px',
            }
        },
    },
});


const CustomTooltip = withStyles({
    tooltip: {
        fontSize: 11,
        color: '#333',
        backgroundColor: '#f8f8f8',
    },
    arrow: {
        color: '#f8f8f8',
    }
})(Tooltip);


type BoardFormProps = {
    isOpen: boolean,
    initialValues: KanbanBoard,
};


function BoardForm({ isOpen, initialValues }: BoardFormProps) {
    const dispatch = useDispatch();
    const classes = useStyles();

    const [state, setState] = React.useState({ ...initialValues });

    React.useEffect(() => {
        setState({ ...initialValues });
    }, [initialValues]);

    const submitForm = () => {
        // Show error if invalid values
        if (state.name === "" || state.name === undefined) {
            dispatch(showAlertBox("error", "Name must not be empty"));
            return;
        }
        // Add or edit board
        if (state.id === "") {
            const boardId: string = generateId();
            dispatch(addBoard({ ...state, id: boardId }));
            dispatch(showAlertBox("success", "Successfully added new board"));
            dispatch(setActiveBoardId(boardId));
            dispatch(hideBoardForm());
        } else {
            dispatch(editBoard(state.id, state));
            dispatch(showAlertBox("success", "Successfully edited board"));
            dispatch(hideBoardForm());
        }
    };

    return (
        <Dialog open={isOpen} onClose={() => dispatch(hideBoardForm())}>
            <Card className={classes.root} elevation={1}>
                <CardContent className="header">
                    <div className="buttons">
                        <CustomTooltip arrow title="Submit" placement="top">
                            <IconButton 
                                size="small" 
                                onClick={submitForm}
                            >
                                <CheckIcon />
                            </IconButton>
                        </CustomTooltip>
                        <CustomTooltip arrow title="Cancel" placement="top">
                            <IconButton 
                                size="small" 
                                onClick={() => dispatch(hideBoardForm())}
                            >
                                <CloseIcon />
                            </IconButton>
                        </CustomTooltip>
                    </div>
                </CardContent>
                <CardContent className="textField">
                    <TextField 
                        id="board-name-input" 
                        placeholder="Board name"
                        fullWidth
                        defaultValue={initialValues.name}
                        onBlur={event => setState({ ...state, name: event.target.value })}
                    />
                </CardContent>
                <CardActions className="colorPicker">
                    <Typography variant="h6" className="text" color="textSecondary">
                        Color
                    </Typography>
                    <CirclePicker
                        width="350px"
                        circleSize={20}
                        circleSpacing={14}
                        color={state.color}
                        colors={[
                            "#d32f2f", "#d81b60", "#9c27b0", "#673ab7", 
                            "#3f51b5", "#1976d2", "#03a9f4", "#0097a7", 
                            "#00695c", "#2e7d32", "#689f38", "#9e9d24", 
                            "#e6ae22", "#ea9000", "#ef6c00", "#f4511e", 
                            "#795548", "#607d8b", "#757575", "#424242",
                        ]}
                        onChange={color => setState({ ...state, color: color.hex })}
                    />
                </CardActions>
            </Card>
        </Dialog>
    )
}

export { BoardForm };