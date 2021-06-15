import {UI_START_ACTION, UI_STOP_ACTION, SHOW_MESSAGE, HIDE_MESSAGE, NOTIFICATION_INFO} from '../constants/ActionTypes'

const INIT_STATE = {
  loader: {
    actions: [] // {name, param}
  },
  notification: {
    title: null,
    message: null,
    severity: null
  }
};

const uiReducer = (state = INIT_STATE, action) => {
  const {loader} = state;
  const {actions} = loader;

  switch (action.type) {
    case UI_START_ACTION:
      return {
        ...state, loader: {...loader, actions: [...actions, {name: action.name, param: action.param}]}
      };
    case UI_STOP_ACTION:
      return {
        ...state, loader: {...loader, actions: actions.filter(item => item.name !== action.name)}
      };
    case SHOW_MESSAGE: {
      return {
        ...state, notification: {title: action.title, message: action.message, severity: action.severity ? action.severity : NOTIFICATION_INFO}
      };
    }
    case HIDE_MESSAGE: {
      return {
        ...state, notification: INIT_STATE.notification
      };
    }
    default:
      return state;
  }
};

export default uiReducer;