import {
  ADD_REVIEW_FAIL,
  ADD_REVIEW_REQUEST,
  ADD_REVIEW_SUCCESS,
  GET_BOOK_REVIEWS_FAIL,
  GET_BOOK_REVIEWS_REQUEST,
  GET_BOOK_REVIEWS_SUCCESS,
} from "../constants/reviewConstants";

export const reviewReducer = (
  state = {
    reviews: [],
  },
  action
) => {
  switch (action.type) {
    case GET_BOOK_REVIEWS_REQUEST:
    case ADD_REVIEW_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case GET_BOOK_REVIEWS_SUCCESS:
    case ADD_REVIEW_SUCCESS:
      return {
        ...state,
        loading: false,
        reviews: action.payload,
      };
    case GET_BOOK_REVIEWS_FAIL:
    case ADD_REVIEW_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
