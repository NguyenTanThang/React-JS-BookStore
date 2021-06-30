import {
  GET_ALL_BOOKS_REQUEST,
  GET_ALL_BOOKS_SUCCESS,
  GET_ALL_BOOKS_FAIL,
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

export const bookListReducer = (
  state = {
    books: [],
    loading: true,
  },
  action
) => {
  switch (action.type) {
    case GET_ALL_BOOKS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    case GET_ALL_BOOKS_SUCCESS:
      return {
        ...state,
        loading: false,
        books: action.payload,
      };
    case GET_ALL_BOOKS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const getBookRecSectionReducer = (
  state = {
    recSection: null,
    loading: true,
  },
  action
) => {
  switch (action.type) {
    case GET_BOOKS_REC_SECTION_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    case GET_BOOKS_REC_SECTION_SUCCESS:
      return {
        ...state,
        loading: false,
        recSection: action.payload,
      };
    case GET_BOOKS_REC_SECTION_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const getBookRandomReducer = (
  state = {
    randomBooks: null,
    loading: true,
  },
  action
) => {
  switch (action.type) {
    case GET_BOOKS_RANDOM_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    case GET_BOOKS_RANDOM_SUCCESS:
      return {
        ...state,
        loading: false,
        randomBooks: action.payload,
      };
    case GET_BOOKS_RANDOM_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const bookDetailsReducer = (
  state = {
    book: null,
    loading: true,
  },
  action
) => {
  switch (action.type) {
    case GET_BOOK_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    case GET_BOOK_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        book: action.payload,
      };
    case GET_BOOK_DETAILS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
