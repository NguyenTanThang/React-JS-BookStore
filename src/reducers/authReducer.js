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

export const changePasswordReducer = (
  state = {
    loading: false,
  },
  action
) => {
  switch (action.type) {
    case USER_CHANGE_PASSWORD_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case USER_CHANGE_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case USER_CHANGE_PASSWORD_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const authReducer = (
  state = {
    userInfo: localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null,
  },
  action
) => {
  switch (action.type) {
    case USER_SIGNIN_REQUEST:
    case USER_SIGNUP_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case USER_SIGNUP_SUCCESS:
      return {
        ...state,
        loading: false,
        userInfo: null,
      };
    case USER_SIGNIN_SUCCESS:
      return {
        ...state,
        loading: false,
        userInfo: action.payload,
      };
    case USER_SIGNIN_FAIL:
    case USER_SIGNUP_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case USER_SIGNOUT_REQUEST:
      return {
        userInfo: null,
      };
    default:
      return state;
  }
};
