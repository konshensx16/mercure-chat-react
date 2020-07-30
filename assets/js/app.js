import ReactDOM from 'react-dom';
import React from 'react';
import store from './store'
import {Provider} from 'react-redux'
import App from './components/App';


ReactDOM.render((
    <Provider store={store}>
        <App />
    </Provider>
), document.getElementById('app'));