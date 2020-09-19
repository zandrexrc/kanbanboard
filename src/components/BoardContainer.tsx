import React from 'react';
import { useSelector } from 'react-redux';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { makeStyles } from '@material-ui/core/styles';
import { IntroPage } from './IntroPage';
import { Header } from './Header';
import { ColumnsContainer } from './ColumnsContainer';
import { DetailedCard } from './DetailedCard';
import { CardForm } from './CardForm';
import { BoardForm } from './BoardForm';
import { BoardsList } from './BoardsList';
import { TagsList } from './TagsList';
import { ConfirmationBox } from './ConfirmationBox';
import { AlertBox } from './AlertBox';
import { ReduxState } from '../types';

const useStyles = makeStyles({
    root: {
        width: '720px',
        height: '440px',
        display: 'flex',
        flexFlow: 'column noWrap',
        justifyContent: 'center',
        alignItems: 'center',
        border: '4px double #ddd',
        borderRadius: '8px',
        overflow: 'hidden',
        position: 'relative',
        "& .creds": {
            position: 'absolute',
            bottom: 10,
            right: 10,
            padding: '0 10px 5px 10px',
            borderTop: '1px solid #fff',
            borderLeft: '1px solid #fff',
            borderRadius: '8px 0 0 0',
            backgroundColor: '#fff',
            transition: 'all 0.2s ease-in-out',
            "&:hover": {
                backgroundColor: 'transparent',
            },
            "& a": {
                color: '#fff',
                fontSize: '0.8em',
                textDecoration: 'none',
            }
        },
    },
});


function BoardContainer() {
    // Fetch redux state
    const dataIsLoaded = useSelector((state: ReduxState) => state.dataIsLoaded);
    const boards = useSelector((state: ReduxState) => state.boards);
    const activeBoard = useSelector((state: ReduxState) => 
                        state.boards.find(b => b.id === state.activeBoardId));
    const popups = useSelector((state: ReduxState) => state.popups);

    // Display cards
    const filter = useSelector((state: ReduxState) => state.filter);
    const displayedCards = filter ? 
                        activeBoard?.cards.filter(c => c.tags.includes(filter)) : 
                        activeBoard?.cards
    const todoCards = displayedCards?.filter(c => c.status === 'Todo');
    const doingCards = displayedCards?.filter(c => c.status === 'Doing');
    const doneCards = displayedCards?.filter(c => c.status === 'Done');

    const classes = useStyles();

    return (
        <DndProvider backend={HTML5Backend}>
            {
                dataIsLoaded && boards.length === 0 &&
                <div className={classes.root}>
                    <IntroPage />
                </div>
            }
            {
                dataIsLoaded && boards.length > 0 &&
                <div className={classes.root}>
                    <Header 
                        boardColor={activeBoard ? activeBoard.color : '#d32f2f'}
                        boardName={activeBoard ? activeBoard.name : ''} 
                        boards={boards}
                    />
                    <ColumnsContainer 
                        boardColor={activeBoard ? activeBoard.color : '#d32f2f'}
                        boardId={activeBoard ? activeBoard.id : ''}
                        todoCards={todoCards ? todoCards : []} 
                        doingCards={doingCards ? doingCards : []}
                        doneCards={doneCards ? doneCards : []}
                    />
                    <div className="creds">
                        <a href="http://zandrexrc.me">z</a>
                    </div>
                </div>
            }
            <DetailedCard 
                isOpen={popups.detailedCard.isOpen} 
                card={popups.detailedCard.values} 
                color={activeBoard ? activeBoard.color : '#d32f2f'}
                boardId={activeBoard ? activeBoard.id : ''}
            />
            <BoardsList 
                isOpen={popups.boardsList.isOpen} 
                boards={boards} 
            />
            <TagsList 
                isOpen={popups.tagsList.isOpen} 
                tags={activeBoard ? activeBoard.tags : []} 
                activeFilter={filter}
            />
            <CardForm 
                isOpen={popups.cardForm.isOpen} 
                initialValues={popups.cardForm.values}
                boardColor={activeBoard ? activeBoard.color : '#d32f2f'}
                boardId={activeBoard ? activeBoard.id : ''}
            />
            <BoardForm 
                isOpen={popups.boardForm.isOpen} 
                initialValues={popups.boardForm.values} 
            />
            <ConfirmationBox 
                isOpen={popups.confirmationBox.isOpen} 
                message={popups.confirmationBox.message}
                onConfirm={popups.confirmationBox.onConfirm}
            />
            <AlertBox 
                isOpen={popups.alertBox.isOpen}
                severity={popups.alertBox.severity}
                message={popups.alertBox.message}
            />
        </DndProvider>
    )
}

export { BoardContainer };