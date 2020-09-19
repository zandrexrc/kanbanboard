import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { configureStore } from './redux/store';
import './index.css';
import { App } from './App';
import { loadBoards } from './redux/actions/boards';
import * as serviceWorker from './serviceWorker';


// Set up redux store
const store = configureStore({});

// Init boards
async function loadData() {
  await store.dispatch(loadBoards());
}
loadData();

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
