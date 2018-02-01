import firebase from 'firebase/app';
import 'firebase/database';

import { firebaseConfig } from './constants';

firebase.initializeApp(firebaseConfig);

export default function* defaultSaga() {
  // todo
}
