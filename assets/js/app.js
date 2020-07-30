import ReactDOM from 'react-dom';
import React from 'react';
import store from './store'
import {Provider} from 'react-redux'
import {BrowserRouter} from 'react-router-dom';

import App from './components/App';


ReactDOM.render((
    <Provider store={store}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Provider>
), document.getElementById('app'));