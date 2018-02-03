import { put, takeEvery } from 'redux-saga/effects';
import firebase from 'firebase/app';
import 'firebase/database';
import { ACTIONS, REASONS, firebaseConfig } from './constants';

let currentUser;
firebase.initializeApp(firebaseConfig);
const userDb = firebase.database().ref('users');

userDb.on('value', (e) => {
  console.log(e);
});

function findUsernameMatched({ userName }) {
  return userDb.orderByValue().equalTo(userName).once('value');
}

function deleteMatchedUser(matches) {
  if (matches.val()) {
    const promises = Object.keys(matches.val()).map(key => userDb.child(key).remove());
    return Promise.all(promises);
  }
  return Promise.resolve();
}

function* signin(action) {
  const { userName } = action;
  if ((yield findUsernameMatched(action)).val()) {
    // duplicated
    yield put({ type: ACTIONS.USER_SINGIN_REJECTED, userName, reason: REASONS.SIGNIN.DUPLICATION });
  } else {
    yield userDb.push(userName);
    currentUser = userName;
    yield put({ type: ACTIONS.USER_SINGIN_SUCCESSED, userName });
  }
}

function* signout() {
  const matches = yield findUsernameMatched({ userName: currentUser });
  yield deleteMatchedUser(matches);
  yield put({ type: ACTIONS.USER_SINGOUT_SUCCESSED });
}
export default function* defaultSaga() {
  yield takeEvery(ACTIONS.USER_SINGIN_REQUESTED, signin);
  yield takeEvery(ACTIONS.USER_SINGOUT_REQUESTED, signout);
}
