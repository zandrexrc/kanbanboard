import React from 'react';
import { useDispatch } from 'react-redux';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { 
    Card, 
    CardActions, 
    CardContent, 
    Dialog, 
    IconButton, 
    MenuItem, 
    TextField, 
    Tooltip, 
    Select 
} from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import { KanbanCard } from '../types';
import { addCard, editCard } from '../redux/actions/boards';
import { hideCardForm, showAlertBox, showDetailedCard } from '../redux/actions/ui';
import { generateId } from '../utils';


const useStyles = makeStyles({
    root: {
        width: 400,
        height: 200,
        overflow: 'hidden',
        backgroundColor: 'rgba(255, 255, 255, 1)',
        "& .header": {
            height: 29,
            padding: '7px 15px 3px 20px',
            backgroundColor: '#f8f8f8',
            borderBottom: '1px solid #ddd',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            "& .buttons": {
                height: '36px',
                display: 'flex',
                alignItems: 'center',
            }
        },
        "& .content": {
            height: 80,
            padding: 20,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            "& .text": {
                width: '100%',
                height: 'auto',
                maxHeight: 80,
                overflow: 'auto',
            }
        },
        "& .footer": {
            padding: '7px 20px 10px 20px',
            overflow: 'hidden',
            color: '#fff',
            "& #tags-form": {
                color: '#fff',
            },
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


type CardFormProps = {
    isOpen: boolean,
    initialValues: KanbanCard,
    boardColor: string,
    boardId: string,
};


function CardForm({ isOpen, initialValues, boardColor, boardId }: CardFormProps) {
    const dispatch = useDispatch();
    const classes = useStyles();
    const [state, setState] = React.useState({ ...initialValues });

    React.useEffect(() => {
        setState({ ...initialValues });
    }, [initialValues]);

    const setTags = (tagsString: string) => {
        // Parse string
        let parsedTags = tagsString.split(",").map(tag => tag.trim());
        setState({ ...state, tags: parsedTags });
    }

    const submitForm = () => {
        // Show error if invalid values
        if (state.content === "") {
            dispatch(showAlertBox("error", "Content must not be empty"));
            return;
        }
        // Add or edit card
        if (state.id === "") {
            dispatch(addCard(boardId, { ...state, id: generateId() }));
            dispatch(showAlertBox("success", "Successfully added new card"));
            dispatch(hideCardForm());
        } else {
            dispatch(editCard(boardId, state));
            dispatch(showAlertBox("success", "Successfully edited card"));
            dispatch(hideCardForm());
            dispatch(showDetailedCard(state));
        }
    }

    return (
        <Dialog open={isOpen} onClose={() => dispatch(hideCardForm())}>
            <Card className={classes.root} elevation={1}>
                <CardContent className="header">
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={state.status}
                        defaultValue={initialValues.status}
                        onChange={event => setState(
                            { ...state, status: `${event.target.value}`})
                        }
                    >
                        <MenuItem value={"Todo"}>Todo</MenuItem>
                        <MenuItem value={"Doing"}>Doing</MenuItem>
                        <MenuItem value={"Done"}>Done</MenuItem>
                    </Select>
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
                                onClick={() => dispatch(hideCardForm())}
                            >
                                <CloseIcon />
                            </IconButton>
                        </CustomTooltip>
                    </div>
                </CardContent>
                <CardContent className="content">
                    <TextField 
                        id="content-form" 
                        label="" 
                        placeholder="Content" 
                        size="small" 
                        fullWidth 
                        variant="outlined" 
                        multiline 
                        rows={4} 
                        onBlur={event => setState(
                            { ...state, content: event.target.value })
                        }
                        defaultValue={initialValues.content}
                    />
                </CardContent>
                <CardActions 
                    className="footer" 
                    style={{backgroundColor: boardColor}}
                >
                    <TextField 
                        id="tags-form" 
                        label="" 
                        placeholder="Tags (optional)" 
                        size="small" 
                        fullWidth
                        color="secondary" 
                        defaultValue={initialValues.tags.join(', ')}
                        onBlur={event => setTags(event.target.value)}
                    />
                </CardActions>
            </Card>
        </Dialog>
    )
}

export { CardForm };