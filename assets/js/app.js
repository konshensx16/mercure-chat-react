import ReactDOM from 'react-dom';
import React from 'react';
import store from './store'
import {Provider} from 'react-redux'
import {BrowserRouter, MemoryRouter} from 'react-router-dom';

import App from './components/App';


ReactDOM.render((
    <Provider store={store}>
        <MemoryRouter>
            <App/>
        </MemoryRouter>
    </Provider>
), document.getElementById('app'));