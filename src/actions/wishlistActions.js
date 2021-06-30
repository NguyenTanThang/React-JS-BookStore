import axios from "axios";
import {
  ADD_BOOK_TO_WISHLIST_FAIL,
  ADD_BOOK_TO_WISHLIST_REQUEST,
  ADD_BOOK_TO_WISHLIST_SUCCESS,
  GET_USERS_WISHLIST_FAIL,
  GET_USERS_WISHLIST_REQUEST,
  GET_USERS_WISHLIST_SUCCESS,
  REMOVE_BOOK_FROM_WISHLIST_FAIL,
  REMOVE_BOOK_FROM_WISHLIST_REQUEST,
  REMOVE_BOOK_FROM_WISHLIST_SUCCESS,
} from "../constants/wishlistConstants";
import generateAuthHeaders from "../utils/generateAuthHeaders";

const WISHLIST_URL = `${process.env.REACT_APP_API_URL}/api/wishlists`;

export const getUserWishList = () => {
  return async (dispatch, getState) => {
    dispatch({
      type: GET_USERS_WISHLIST_REQUEST,
    });
    try {
      const { authReducer } = getState();
      const { userInfo } = authReducer;
      const { data } = await axios.get(`${WISHLIST_URL}/user-wishlist`, {
        headers: {
          ...generateAuthHeaders(userInfo),
        },
      });
      dispatch({
        type: GET_USERS_WISHLIST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_USERS_WISHLIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
};

export const addToWishList = (bookID) => {
  return async (dispatch, getState) => {
    dispatch({
      type: ADD_BOOK_TO_WISHLIST_REQUEST,
      payload: bookID,
    });
    try {
      const { authReducer } = getState();
      const { userInfo } = authReducer;
      await axios.post(
        `${WISHLIST_URL}/add`,
        {
          bookID,
        },
        {
          headers: {
            ...generateAuthHeaders(userInfo),
          },
        }
      );
      const { data } = await axios.get(`${WISHLIST_URL}/user-wishlist`, {
        headers: {
          ...generateAuthHeaders(userInfo),
        },
      });
      dispatch({
        type: ADD_BOOK_TO_WISHLIST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ADD_BOOK_TO_WISHLIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
};

export const removeFromWishList = (bookID) => {
  return async (dispatch, getState) => {
    dispatch({
      type: REMOVE_BOOK_FROM_WISHLIST_REQUEST,
      payload: bookID,
    });
    try {
      const { authReducer } = getState();
      const { userInfo } = authReducer;
      await axios.delete(`${WISHLIST_URL}/delete/${bookID}`, {
        headers: {
          ...generateAuthHeaders(userInfo),
        },
      });
      const { data } = await axios.get(`${WISHLIST_URL}/user-wishlist`, {
        headers: {
          ...generateAuthHeaders(userInfo),
        },
      });
      dispatch({
        type: REMOVE_BOOK_FROM_WISHLIST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: REMOVE_BOOK_FROM_WISHLIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
};
