import { createStore, applyMiddleware } from 'redux'
import rootReducer from './reducers'
import { apiMiddleware } from 'redux-api-middleware';
import customApiMiddleware from './middlewares/api';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga'
import sagas from './sagas'

const sagaMiddleware = createSagaMiddleware();
const createStoreWithMiddleware = composeWithDevTools(applyMiddleware(customApiMiddleware, apiMiddleware, sagaMiddleware))(createStore)
const initialState = {};
const store = createStoreWithMiddleware(rootReducer, initialState)
sagaMiddleware.run(sagas)

export default store;