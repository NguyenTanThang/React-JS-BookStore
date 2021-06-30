import axios from "axios";
import {
  USER_CHANGE_PASSWORD_FAIL,
  USER_CHANGE_PASSWORD_REQUEST,
  USER_CHANGE_PASSWORD_SUCCESS,
  USER_SIGNIN_FAIL,
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS,
  USER_SIGNOUT_REQUEST,
  USER_SIGNUP_FAIL,
  USER_SIGNUP_REQUEST,
  USER_SIGNUP_SUCCESS,
} from "../constants/authConstants";
import generateAuthHeaders from "../utils/generateAuthHeaders";

const USERS_URL = `${process.env.REACT_APP_API_URL}/api/users`;

export const signin = ({ email, password }) => {
  return async (dispatch) => {
    dispatch({
      type: USER_SIGNIN_REQUEST,
      payload: { email, password },
    });
    try {
      const { data } = await axios.post(`${USERS_URL}/signin`, {
        email,
        password,
      });
      dispatch({
        type: USER_SIGNIN_SUCCESS,
        payload: data,
      });
      localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
      dispatch({
        type: USER_SIGNIN_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
};

export const signup = ({ username, email, password }) => {
  return async (dispatch, getState) => {
    dispatch({
      type: USER_SIGNUP_REQUEST,
      payload: { username, email, password },
    });
    try {
      const { data } = await axios.post(`${USERS_URL}/signup`, {
        username,
        email,
        password,
      });
      dispatch({
        type: USER_SIGNUP_SUCCESS,
        //payload: data,
      });
      //localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
      dispatch({
        type: USER_SIGNUP_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
};

export const changePassword = ({ password, newPassword }) => {
  return async (dispatch, getState) => {
    dispatch({
      type: USER_CHANGE_PASSWORD_REQUEST,
      payload: { password, newPassword },
    });
    try {
      const { authReducer } = getState();
      const { userInfo } = authReducer;
      const { data } = await axios.put(
        `${USERS_URL}/change-password`,
        {
          password,
          newPassword,
        },
        {
          headers: {
            ...generateAuthHeaders(userInfo),
          },
        }
      );
      dispatch({
        type: USER_CHANGE_PASSWORD_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: USER_CHANGE_PASSWORD_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
};

export const signout = () => {
  return (dispatch) => {
    dispatch({
      type: USER_SIGNOUT_REQUEST,
    });
    localStorage.removeItem("userInfo");
  };
};
