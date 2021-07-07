import axios from "axios";
import { UserActionType } from "./action.type";

export const UserLoginStart = () => ({
  type: UserActionType.USER_LOGIN_REQUEST_START,
});

export const UserLoginSuccess = (user) => ({
  type: UserActionType.USER_LOGIN_SUCCESS,
  payload: user,
});

export const UserLoginFailure = (error) => ({
  type: UserActionType.USER_LOGIN_REQUEST_FAILURE,
  payload: error,
});

export const LoginRequestAsync =
  ({ email, password }) =>
  async (dispatch) => {
    try {
      dispatch(UserLoginStart());

      const config = {
        header: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post(
        "http://192.168.0.107:5000/api/users/login",
        { email, password },
        config
      );

      dispatch(UserLoginSuccess(data));
      localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
      dispatch(UserLoginFailure(error.message));
    }
  };

export const LogoutStart = () => ({
  type: UserActionType.USER_LOGOUT_START,
});

export const LogoutSuccess = () => ({
  type: UserActionType.USER_LOGOUT_SUCCESS,
});

export const LogoutFailure = (msg) => ({
  type: UserActionType.USER_LOGOUT_FAILURE,
  payload: msg,
});

export const LogoutRequestAsync = () => (dispatch) => {
  dispatch(LogoutStart());
  localStorage.removeItem("userInfo");
  dispatch(LogoutSuccess());
};

export const UserRegisterStart = () => ({
  type: UserActionType.USER_REGISTER_REQUEST_START,
});

export const UserRegisterSuccess = (data) => ({
  type: UserActionType.USER_REGISTER_REQUEST_SUCCESS,
  payload: data,
});

export const UserRegisterFailure = (message) => ({
  type: UserActionType.USER_REGISTER_REQUEST_FAILURE,
  payload: message,
});

export const RegisterRequestAsync =
  ({ name, email, password }) =>
  async (dispatch) => {
    try {
      dispatch(UserRegisterStart());

      const config = {
        header: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post(
        "http://192.168.0.107:5000/api/users",
        { name, email, password },
        config
      );

      dispatch(UserRegisterSuccess(data));
      dispatch(UserLoginSuccess(data));
      localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
      console.log(error);
      dispatch(UserRegisterFailure(error.message));
    }
  };

export const UserDetailsStart = () => ({
  type: UserActionType.USER_DETAILS_REQUEST_START,
});

export const UserDetailsSuccess = (data) => ({
  type: UserActionType.USER_DETAILS_REQUEST_SUCCESS,
  payload: data,
});

export const UserDetailsfailure = (message) => ({
  type: UserActionType.USER_DETAILS_REQUEST_FAILURE,
  payload: message,
});

export const getUserDetailsAsync = (id) => async (dispatch, getState) => {
  try {
    dispatch(UserDetailsStart());
    const {
      user: { user },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${user.token}`,
      },
    };

    const { data } = await axios.get(
      `http://192.168.0.107:5000/api/users/profile`,
      config
    );
    dispatch(UserDetailsSuccess(data));
  } catch (err) {
    const payload =
      err.response && err.response.data.message
        ? err.response.data.message
        : err.message;

    dispatch(UserDetailsfailure(err.message));
  }
};

// USER_PROFILE_UPDATE_REQ_START: "USER_PROFILE_UPDATE_REQ_START",
// USER_PROFILE_UPDATE_REQ_SUCEESS: "USER_PROFILE_UPDATE_REQ_SUCEESS",
// USER_PROFILE_UPDATE_REQ_FAILURE: "USER_PROFILE_UPDATE_REQ_FAILURE",

export const UserUpdateStart = () => ({
  type: UserActionType.USER_PROFILE_UPDATE_REQ_START,
});

export const UserUpdateSuccess = (data) => ({
  type: UserActionType.USER_PROFILE_UPDATE_REQ_SUCEESS,
  payload: data,
});

export const UserUpdatedFailure = (error) => ({
  type: UserActionType.USER_PROFILE_UPDATE_REQ_FAILURE,
  payload: error,
});

export const userUpdateProfileAsync =
  (updatedUser) => async (dispatch, getState) => {
    try {
      dispatch(UserUpdateStart());
      const {
        user: { user },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${user.token}`,
        },
      };
      console.log(updatedUser);
      const { data } = await axios.put(
        `http://192.168.0.107:5000/api/users/profile`,
        updatedUser,
        config
      );
      console.log(data);
      dispatch(UserUpdateSuccess(data));
    } catch (err) {
      console.log(err);
      const payload =
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message;

      dispatch(UserUpdatedFailure(err.message));
    }
  };
