import { takeEvery } from 'redux-saga/effects'

const allFailures = action => action.type.includes('_FAIL');

export function* handleLogout(){
  yield takeEvery(allFailures, function*(data){
    if(data.payload.status === 401){
      window.location.href = '/login';
    }
  })
}