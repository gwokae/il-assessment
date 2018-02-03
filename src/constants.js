export const ACTIONS = {
  USER_SINGIN_REQUESTED: 'USER_SINGIN_REQUESTED',
  USER_SINGIN_REJECTED: 'USER_SINGIN_REJECTED',
  USER_SINGIN_SUCCESSED: 'USER_SINGIN_SUCCESSED',
  USER_SINGOUT_REQUESTED: 'USER_SINGOUT_REQUESTED',
  USER_SINGOUT_SUCCESSED: 'USER_SINGOUT_SUCCESSED',
};

export const REASONS = {
  SIGNIN: {
    DUPLICATION: 'DUPLICATION',
  },
};

export const firebaseConfig = {
  apiKey: 'AIzaSyCH1OGBFCzovD4ojK8sl_7nYqjCGVGxEdY',
  authDomain: 'il-assessment.firebaseapp.com',
  databaseURL: 'https://il-assessment.firebaseio.com',
  projectId: 'il-assessment',
  storageBucket: 'il-assessment.appspot.com',
  messagingSenderId: '1021486336120',
};

export default {
  ACTIONS, REASONS, firebaseConfig,
};
