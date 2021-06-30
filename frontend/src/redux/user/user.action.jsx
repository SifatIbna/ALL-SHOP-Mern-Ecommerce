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
        "/api/users/login",
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
