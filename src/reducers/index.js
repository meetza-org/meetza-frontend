import user from './user';
import room from './room';
import app from './app';
import { combineReducers } from 'redux';

export default combineReducers({
    user,
    room,
    app,
});