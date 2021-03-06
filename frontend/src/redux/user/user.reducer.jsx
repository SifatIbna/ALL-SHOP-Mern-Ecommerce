import { UserActionType } from "./action.type";

const INITIAL_STATE = {
  user: {},
  userDetails: {},
  isLoading: false,
  error: null,
};

export const UserReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UserActionType.USER_LOGIN_REQUEST_START:
    case UserActionType.USER_LOGOUT_START:
    case UserActionType.USER_REGISTER_REQUEST_START:
    case UserActionType.USER_DETAILS_REQUEST_START:
      return {
        ...state,
        isLoading: true,
      };
    case UserActionType.USER_LOGIN_SUCCESS:
    case UserActionType.USER_REGISTER_REQUEST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        user: action.payload,
        error: null,
      };
    case UserActionType.USER_DETAILS_REQUEST_SUCCESS:
      return {
        ...state,
        userDetails: action.payload,
        error: null,
        isLoading: false,
      };
    case UserActionType.USER_DETAILS_REQUEST_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case UserActionType.USER_LOGIN_REQUEST_FAILURE:
    case UserActionType.USER_REGISTER_REQUEST_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
        user: {},
        userDetails: {},
      };
    case UserActionType.USER_LOGOUT_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case UserActionType.USER_LOGOUT_SUCCESS:
      return {
        ...state,
        user: {},
        userDetails: {},
        isLoading: false,
        error: null,
      };
    default:
      return state;
  }
};

export const UserUpdateProfileReducer = (
  state = { updatedUser: {}, pending: false, updateError: null },
  action
) => {
  switch (action.type) {
    case UserActionType.USER_PROFILE_UPDATE_REQ_START:
      return {
        ...state,
        pending: true,
      };
    case UserActionType.USER_PROFILE_UPDATE_REQ_SUCEESS:
      return {
        ...state,
        updatedUser: action.payload,
        pending: false,
        updateError: null,
      };
    case UserActionType.USER_PROFILE_UPDATE_REQ_FAILURE:
      return {
        ...state,
        pending: false,
        updateError: action.payload,
      };
    default:
      return state;
  }
};

export const userListReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case UserActionType.USER_LIST_REQ_START:
      return {
        ...state,
        loading: true,
      };
    case UserActionType.USER_LIST_REQ_SUCEESS:
      return {
        ...state,
        users: action.payload,
        loading: false,
        error: null,
      };
    case UserActionType.USER_LIST_REQ_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case UserActionType.USER_LIST_RESET:
      return { users: [] };
    default:
      return state;
  }
};

export const UserDeleteReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case UserActionType.USER_DELETE_START:
      return {
        ...state,
        loading: true,
      };
    case UserActionType.USER_DELETE_SUCCESS:
      return {
        ...state,
        success: true,
        loading: false,
        error: null,
      };
    case UserActionType.USER_DELETE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case UserActionType.USER_UPDATE_RESET:
      return {
        user: {},
      };
    default:
      return state;
  }
};

export const userDetailsReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case "USER_DETAILS_REQUEST":
      return { ...state, loading: true };
    case "USER_DETAILS_SUCCESS":
      return { loading: false, user: action.payload };
    case "USER_DETAILS_FAIL":
      return { loading: false, error: action.payload };
    case "USER_DETAILS_RESET":
      return { user: {} };
    default:
      return state;
  }
};

export const UserUpdateReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case UserActionType.USER_UPDATE_REQUEST_START:
      return {
        ...state,
        loading: true,
      };
    case UserActionType.USER_UPDATE_REQUEST_SUCCESS:
      return {
        ...state,
        success: true,
        loading: false,
        error: null,
      };
    case UserActionType.USER_UPDATE_REQUEST_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case UserActionType.USER_UPDATE_RESET:
      return {
        user: {},
      };
    default:
      return state;
  }
};
