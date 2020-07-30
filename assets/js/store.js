import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import reducers from './reducers/conversation'

let store = createStore(reducers, applyMiddleware(thunk))

export default store;