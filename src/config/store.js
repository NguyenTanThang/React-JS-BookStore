import { createStore, compose, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { authReducer, changePasswordReducer } from "../reducers/authReducer";
import {
  bookDetailsReducer,
  bookListReducer,
  getBookRandomReducer,
  getBookRecSectionReducer,
} from "../reducers/bookReducer";
import { wishlistReducer } from "../reducers/wishlistReducer";
import { reviewReducer } from "../reducers/reviewReducer";
import { cartReducer } from "../reducers/cartReducer";
import {
  userOrderReducer,
  addOrderReducer,
  orderDetailsReducer,
  orderPayReducer
} from "../reducers/orderReducer";

const initialState = {};

const reducer = combineReducers({
  authReducer,
  bookListReducer,
  bookDetailsReducer,
  changePasswordReducer,
  wishlistReducer,
  reviewReducer,
  bookRecSectionReducer: getBookRecSectionReducer,
  bookRandomReducer: getBookRandomReducer,
  cartReducer,
  userOrderReducer,
  orderDetailsReducer,
  addOrderReducer,
  orderPayReducer
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;
