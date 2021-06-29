import { UserActionType } from "./action.type";

const INITIAL_STATE = {
  user: null,
  isLoading: false,
  error: null,
};

const UserReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UserActionType.USER_LOGIN_REQUEST_START:
    case UserActionType.USER_LOGOUT_START:
      return {
        ...state,
        isLoading: true,
      };
    case UserActionType.USER_LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        user: action.payload,
      };
    case UserActionType.USER_LOGIN_REQUEST_FAILURE:
    case UserActionType.USER_LOGOUT_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case UserActionType.USER_LOGOUT_SUCCESS:
      return {
        ...state,
        user: null,
        isLoading: false,
      };
    default:
      return state;
  }
};

export default UserReducer;
