import {combineReducers, createStore, applyMiddleware} from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import leads from './leadsReducer'
import auth from './authReducer'


const rootReducer = combineReducers({
	leads,
	auth,
})

const middlewares = [thunk,]

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(...middlewares)))
export default store
