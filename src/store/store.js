import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import combineReducers from 'reducers'
import { composeWithDevTools } from 'redux-devtools-extension';

let store = createStore(combineReducers, composeWithDevTools(applyMiddleware(thunk)))

export default store
