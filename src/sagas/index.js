import { all } from 'redux-saga/effects'
import { watchSendSignal, watchSocketServer } from './socket'

export default function* sagas() {
  yield all([
    watchSendSignal(),
    watchSocketServer(),
  ]);
}
