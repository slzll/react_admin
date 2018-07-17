import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import combineReducers from 'reducers'
import promiseMiddleware from './middleware/promiseMiddleware'

let store = createStore(combineReducers, applyMiddleware(promiseMiddleware))

export default store
