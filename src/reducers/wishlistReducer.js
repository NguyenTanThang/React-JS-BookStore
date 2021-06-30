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

export const wishlistReducer = (
  state = {
    wishlists: [],
  },
  action
) => {
  switch (action.type) {
    case GET_USERS_WISHLIST_REQUEST:
    case ADD_BOOK_TO_WISHLIST_REQUEST:
    case REMOVE_BOOK_FROM_WISHLIST_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case GET_USERS_WISHLIST_SUCCESS:
    case ADD_BOOK_TO_WISHLIST_SUCCESS:
    case REMOVE_BOOK_FROM_WISHLIST_SUCCESS:
      return {
        ...state,
        loading: false,
        wishlists: action.payload,
      };
    case GET_USERS_WISHLIST_FAIL:
    case ADD_BOOK_TO_WISHLIST_FAIL:
    case REMOVE_BOOK_FROM_WISHLIST_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
