import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import userReducer from './userDuck';
import thunk from 'redux-thunk';
import charsReducer from './charsDucks';


let rootReducer = combineReducers({
    user : userReducer,
    characters: charsReducer
   
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


export default function generateStore(){
    let store = createStore(
        rootReducer,
        composeEnhancers(applyMiddleware(thunk))
        )
     return store   
}