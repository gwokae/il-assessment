import { put, takeEvery } from 'redux-saga/effects';
import firebase from 'firebase/app';
import 'firebase/database';
import { ACTIONS, REASONS, firebaseConfig } from './constants';

firebase.initializeApp(firebaseConfig);
const userDb = firebase.database().ref('users');

userDb.on('value', (e) => {
  console.log(e);
});

function* signin(action) {
  const { userName } = action;
  const eqaulUsers = yield userDb.orderByValue().equalTo(userName).once('value');
  if (eqaulUsers.val()) {
    // duplicated
    yield put({ type: ACTIONS.USER_SINGIN_REJECTED, userName, reason: REASONS.SIGNIN.DUPLICATION });
  } else {
    yield userDb.push(userName);
    yield put({ type: ACTIONS.USER_SINGIN_SUCCESSED, userName });
  }
}
export default function* defaultSaga() {
  yield takeEvery(ACTIONS.USER_SINGIN_REQUESTED, signin);
}
