import { put, takeEvery } from 'redux-saga/effects';
import firebase from 'firebase/app';
import { ACTIONS, REASONS } from './constants';
import { userDb, messageDb } from './data';

let currentUser;


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

function* postMessage({ message }) {
  yield messageDb.push({
    message,
    timestamp: firebase.database.ServerValue.TIMESTAMP,
    author: currentUser,
  });
  yield put({ type: ACTIONS.POST_MESSAGE_SUCCESSED });
}

export default function* defaultSaga() {
  yield takeEvery(ACTIONS.USER_SINGIN_REQUESTED, signin);
  yield takeEvery(ACTIONS.USER_SINGOUT_REQUESTED, signout);
  yield takeEvery(ACTIONS.POST_MESSAGE_REQUESTED, postMessage);
}
