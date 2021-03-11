import { takeEvery, put } from 'redux-saga/effects'
import USER from '../action_types/user'

const allFailures = action => action.type.includes('_FAIL');

export function* handleLogout(){
  yield takeEvery(allFailures, function*(data){
    if(data.payload.status === 401){
      yield put({ type: USER.LOGOUT.SUCCESS })
      window.location.href = '/';
    }
  })
}