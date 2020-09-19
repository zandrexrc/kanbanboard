import React from 'react';
import { Box } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';
// import { TaskCard } from './components/TaskCard';
// import { BoardToolbar } from './components/BoardToolbar';
// import { BoardColumns } from './components/BoardColumns';
import { BoardContainer } from './components/BoardContainer';
import { theme } from './themes/theme';
import './App.css';


function App() {
  return (
    <ThemeProvider theme={theme}>
      <Box className="App">
        <BoardContainer />
      </Box>
    </ThemeProvider>
  );
}

export { App };