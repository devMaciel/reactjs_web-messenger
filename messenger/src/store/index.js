import { applyMiddleware, createStore } from 'redux';
import rootReducer from '../reducers';
import thunk from 'redux-thunk';

//thunk pra async action
const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;