import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import StoreConfig from './Redux/store';
import getVisableExpenses from './Redux/selector';

const store = StoreConfig();

const state = store.getState();

const visable = getVisableExpenses(state.items, state.filter);

console.log(visable);

const jsx = (
    <Provider store= {store}>
            <App />
    </Provider>
);

ReactDOM.render(
    (jsx),document.getElementById('root'));
registerServiceWorker();
