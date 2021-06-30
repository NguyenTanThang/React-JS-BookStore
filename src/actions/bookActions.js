import axios from "axios";
import {
  GET_ALL_BOOKS_FAIL,
  GET_ALL_BOOKS_SUCCESS,
  GET_ALL_BOOKS_REQUEST,
  GET_BOOK_DETAILS_REQUEST,
  GET_BOOK_DETAILS_SUCCESS,
  GET_BOOK_DETAILS_FAIL,
  GET_BOOKS_REC_SECTION_REQUEST,
  GET_BOOKS_REC_SECTION_SUCCESS,
  GET_BOOKS_REC_SECTION_FAIL,
  GET_BOOKS_RANDOM_REQUEST,
  GET_BOOKS_RANDOM_SUCCESS,
  GET_BOOKS_RANDOM_FAIL,
} from "../constants/bookConstants";

const BOOKS_URL = `${process.env.REACT_APP_API_URL}/api/books`;

export const getAllBooks = () => {
  return async (dispatch) => {
    dispatch({
      type: GET_ALL_BOOKS_REQUEST,
    });
    try {
      const { data } = await axios.get(`${BOOKS_URL}`);
      dispatch({
        type: GET_ALL_BOOKS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_ALL_BOOKS_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
};

export const getBooksRecSection = () => {
  return async (dispatch) => {
    dispatch({
      type: GET_BOOKS_REC_SECTION_REQUEST,
    });
    try {
      const { data } = await axios.get(`${BOOKS_URL}/rec-section`);
      dispatch({
        type: GET_BOOKS_REC_SECTION_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_BOOKS_REC_SECTION_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
};

export const getBooksRandom = () => {
  return async (dispatch) => {
    dispatch({
      type: GET_BOOKS_RANDOM_REQUEST,
    });
    try {
      const { data } = await axios.get(`${BOOKS_URL}/random`);
      dispatch({
        type: GET_BOOKS_RANDOM_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_BOOKS_RANDOM_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
};

export const getBookDetails = (bookID) => {
  return async (dispatch) => {
    dispatch({
      type: GET_BOOK_DETAILS_REQUEST,
    });
    try {
      const { data } = await axios.get(`${BOOKS_URL}/bookID/${bookID}`);
      dispatch({
        type: GET_BOOK_DETAILS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_BOOK_DETAILS_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
};
