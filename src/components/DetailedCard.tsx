import React from 'react';
import { useDispatch } from 'react-redux';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { 
    Card, 
    CardActions, 
    CardContent, 
    Dialog, 
    CardHeader, 
    IconButton, 
    Tooltip, 
    Typography 
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { Scrollbars } from 'react-custom-scrollbars';
import { KanbanCard } from '../types';
import { deleteCard } from '../redux/actions/boards';
import { hideDetailedCard, hideConfirmationBox, showCardForm, showConfirmationBox, showAlertBox } from '../redux/actions/ui';

const useStyles = makeStyles({
    root: {
        width: 400,
        height: 200,
        overflow: 'hidden',
        backgroundColor: 'rgba(255, 255, 255, 1)',
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
            height: 10,
            padding: '15px 20px',
            overflow: 'hidden',
            color: '#fff',
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


type DetailedCardProps = {
    isOpen: boolean,
    card: KanbanCard,
    color: string,
    boardId: string,
};


function DetailedCard({ isOpen, card, color, boardId }: DetailedCardProps) {
    const dispatch = useDispatch();
    const classes = useStyles();

    const confirmDeleteCard = (cardId: string) => {
        dispatch(deleteCard(boardId, cardId));
        dispatch(hideConfirmationBox());
        dispatch(hideDetailedCard());
        dispatch(showAlertBox("success", "Card has been deleted"));
    }

    return (
        <Dialog open={isOpen} onClose={() => dispatch(hideDetailedCard())}>
            <Card className={classes.root} elevation={1}>
                <CardHeader 
                    className="header"
                    title={ card.status }
                    action={
                        <div className={"buttons"}>
                            <CustomTooltip arrow title="Edit card" placement="top">
                                <IconButton 
                                    size="small" 
                                    onClick={() => dispatch(showCardForm(card))}
                                >
                                    <EditIcon />
                                </IconButton>
                            </CustomTooltip>
                            <CustomTooltip arrow title="Delete card" placement="top">
                                <IconButton 
                                    size="small" 
                                    onClick={() => dispatch(showConfirmationBox(
                                        "Delete this card permanently?",
                                        () => confirmDeleteCard(card.id)
                                    ))}
                                >
                                    <DeleteIcon />
                                </IconButton>
                            </CustomTooltip>
                        </div>
                    }
                    titleTypographyProps={{variant: 'h6'}}
                />
                <CardContent className="content">
                    <Typography variant="body1" component="div" className={"text"}>
                        <Scrollbars autoHeight autoHeightMin={0} autoHeightMax={80}>
                            { card.content }
                        </Scrollbars>
                    </Typography>
                </CardContent>
                <CardActions className={"footer"} style={{backgroundColor: color}}>
                    { card.tags.map((tag, index) => (
                        <Typography key={index} variant="body2">
                            { tag }
                        </Typography>
                    ))}
                </CardActions>
            </Card>
        </Dialog>
    )
}

export { DetailedCard };