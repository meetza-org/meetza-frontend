import { all } from 'redux-saga/effects'
import {handleLogout} from './room';
import { watchSendSignal, watchSocketServer } from './socket'

export default function* sagas() {
  yield all([
    handleLogout(),
    watchSendSignal(),
    watchSocketServer(),
  ]);
}
