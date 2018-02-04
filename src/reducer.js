import { ACTIONS, REASONS } from './constants';

const DEFAULTS = { loading: false, messages: {} };
export default (state = DEFAULTS, action) => {
  const { type } = action;
  switch (type) {
    case ACTIONS.USER_SINGIN_REQUESTED:
      return {
        ...state,
        loading: true,
      };
    case ACTIONS.USER_SINGIN_SUCCESSED:
      return {
        ...state,
        userName: action.userName,
        loading: false,
        singinError: null,
      };
    case ACTIONS.USER_SINGIN_REJECTED: {
      let singinError;
      switch (action.reason) {
        case REASONS.SIGNIN.DUPLICATION:
          singinError = `User name '${action.userName}' already taken`;
          break;
        default:
          singinError = 'Unhandled error during sign in';
      }
      return {
        ...state,
        singinError,
        loading: false,
      };
    }
    case ACTIONS.USER_SINGOUT_REQUESTED:
      return {
        ...state,
        loading: true,
      };
    case ACTIONS.USER_SINGOUT_SUCCESSED:
      return {
        ...state,
        loading: false,
        userName: null,
      };
    case ACTIONS.LOAD_MESSAGES_REQUESTED:
      return {
        ...state,
        loading: true,
        messages: Object.assign({}, state.messages),
      };
    case ACTIONS.NEW_MESSAGES_RECEIVED:
      return {
        ...state,
        messages: Object.assign({}, state.messages, action.messages),
      };
    default:
      return state;
  }
};
