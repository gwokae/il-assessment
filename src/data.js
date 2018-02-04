import firebase from 'firebase/app';
import 'firebase/database';
import { firebaseConfig } from './constants';

export const app = firebase.initializeApp(firebaseConfig);
export const userDb = firebase.database().ref('users');
export const messageDb = firebase.database().ref('messages');
export default firebase;
