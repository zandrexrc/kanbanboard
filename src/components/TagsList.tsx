import React from 'react';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { 
    Button, 
    Card, 
    CardActions,
    CardHeader, 
    Dialog, 
    List, 
    ListItem,  
    ListItemText,
} from '@material-ui/core';
import { Scrollbars } from 'react-custom-scrollbars';
import { hideTagsList, setFilter } from '../redux/actions/ui';

const useStyles = makeStyles({
    root: {
        width: 300,
        height: 300,
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
                borderBottom: '1px solid #ddd',
            }
        },
        "& .footer": {
            padding: '14px 20px',
            backgroundColor: '#f8f8f8',
        },
    },
});


type TagsListProps = {
    isOpen: boolean,
    tags: string[],
    activeFilter: string | null,
};


function TagsList({ isOpen, tags, activeFilter }: TagsListProps) {
    const dispatch = useDispatch();
    const classes = useStyles();

    const changeFilter = (tag: string | null) => {
        dispatch(setFilter(tag));
        dispatch(hideTagsList());
    }

    return (
        <Dialog open={isOpen} onClose={() => dispatch(hideTagsList())}>
            <Card className={classes.root} elevation={1}>
                <CardHeader 
                    className="header"
                    title="Tags"
                    titleTypographyProps={{variant: 'h6'}}
                />
                <List className="list">
                    <Scrollbars>
                        { tags.map((tag, index) => (
                            <ListItem 
                                key={index} 
                                button
                                onClick={() => changeFilter(tag)}
                                style={{
                                    backgroundColor: tag === activeFilter ? 
                                    'rgba(0, 0, 0, 0.1)' : 'transparent'
                                }}
                            >
                                <ListItemText primary={ tag } />
                            </ListItem>
                        ))}
                    </Scrollbars>
                </List>
                <CardActions className="footer">
                    <Button 
                        fullWidth 
                        color="primary" 
                        variant="contained" 
                        disableElevation
                        onClick={() => changeFilter(null)}
                    >
                        Clear filter
                    </Button>
                </CardActions>
            </Card>
        </Dialog>
    )
}

export { TagsList };