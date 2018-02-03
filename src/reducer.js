import { ACTIONS } from './constants';

const DEFAULTS = {};
export default (state = DEFAULTS, action) => {
  // todo
  const { type } = action;
  switch(type) {
    case ACTIONS.USER_SINGIN_REQUESTED:
      return {
        ...state,
        userName: action.userName,
      };
    case ACTIONS.USER_SINGOUT_REQUESTED:
      return {
        ...state,
        userName: null,
      };
  }
  return state;
};
