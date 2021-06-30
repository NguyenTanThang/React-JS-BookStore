import axios from "axios";
import {
  ADD_REVIEW_FAIL,
  ADD_REVIEW_REQUEST,
  ADD_REVIEW_SUCCESS,
  GET_BOOK_REVIEWS_FAIL,
  GET_BOOK_REVIEWS_REQUEST,
  GET_BOOK_REVIEWS_SUCCESS,
} from "../constants/reviewConstants";

import generateAuthHeaders from "../utils/generateAuthHeaders";

const REVIEW_URL = `${process.env.REACT_APP_API_URL}/api/reviews`;

export const getBookReviews = (bookID) => {
  return async (dispatch, getState) => {
    dispatch({
      type: GET_BOOK_REVIEWS_REQUEST,
    });
    try {
      const { data } = await axios.get(`${REVIEW_URL}/bookID/${bookID}`);
      dispatch({
        type: GET_BOOK_REVIEWS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_BOOK_REVIEWS_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
};

export const addReview = ({ bookID, star, title, body }) => {
  return async (dispatch, getState) => {
    dispatch({
      type: ADD_REVIEW_REQUEST,
      payload: { bookID, star },
    });
    try {
      const { authReducer } = getState();
      const { userInfo } = authReducer;
      await axios.post(
        `${REVIEW_URL}/add`,
        {
          bookID,
          star,
          title,
          body,
        },
        {
          headers: {
            ...generateAuthHeaders(userInfo),
          },
        }
      );
      const { data } = await axios.get(`${REVIEW_URL}/bookID/${bookID}`, {
        headers: {
          ...generateAuthHeaders(userInfo),
        },
      });
      dispatch({
        type: ADD_REVIEW_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ADD_REVIEW_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
};
