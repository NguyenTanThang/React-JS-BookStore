import axios from "axios";
import {
  ADD_ORDER_FAIL,
  ADD_ORDER_REQUEST,
  ADD_ORDER_SUCCESS,
  GET_ORDER_DETAILS_FAIL,
  GET_ORDER_DETAILS_REQUEST,
  GET_ORDER_DETAILS_SUCCESS,
  GET_USER_ORDERS_FAIL,
  GET_USER_ORDERS_REQUEST,
  GET_USER_ORDERS_SUCCESS,
  ORDER_PAY_FAIL,
  ORDER_PAY_REQUEST,
  ORDER_PAY_SUCCESS,
} from "../constants/orderConstants";
import generateAuthHeaders from "../utils/generateAuthHeaders";

const ORDER_URL = `${process.env.REACT_APP_API_URL}/api/orders`;

export const getUserOrders = () => {
  return async (dispatch, getState) => {
    dispatch({
      type: GET_USER_ORDERS_REQUEST,
    });
    try {
      const { authReducer } = getState();
      const { userInfo } = authReducer;
      const { data } = await axios.get(`${ORDER_URL}/mine`, {
        headers: {
          ...generateAuthHeaders(userInfo),
        },
      });
      dispatch({
        type: GET_USER_ORDERS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_USER_ORDERS_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
};

export const getOrderDetails = (orderID) => {
  return async (dispatch, getState) => {
    dispatch({
      type: GET_ORDER_DETAILS_REQUEST,
      payload: orderID,
    });
    try {
      const { authReducer } = getState();
      const { userInfo } = authReducer;
      const { data } = await axios.get(`${ORDER_URL}/orderID/${orderID}`, {
        headers: {
          ...generateAuthHeaders(userInfo),
        },
      });
      dispatch({
        type: GET_ORDER_DETAILS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_ORDER_DETAILS_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
};

export const addOrder = (newOrder) => {
  return async (dispatch, getState) => {
    dispatch({
      type: ADD_ORDER_REQUEST,
      payload: newOrder,
    });
    try {
      const { authReducer } = getState();
      const { userInfo } = authReducer;
      const { data } = await axios.post(`${ORDER_URL}/add`, newOrder, {
        headers: {
          ...generateAuthHeaders(userInfo),
        },
      });
      dispatch({
        type: ADD_ORDER_SUCCESS,
        payload: data.order,
      });
    } catch (error) {
      dispatch({
        type: ADD_ORDER_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
};

export const payOrder = (order, paymentResult) => {
  return async (dispatch, getState) => {
    dispatch({
      type: ORDER_PAY_REQUEST,
      payload: {
        order,
        paymentResult,
      },
    });
    const { authReducer } = getState();
    const { userInfo } = authReducer;
    try {
      const { data } = await axios.put(
        `${ORDER_URL}/${order._id}/pay`,
        paymentResult,
        {
          headers: {
            ...generateAuthHeaders(userInfo),
          },
        }
      );
      dispatch({
        type: ORDER_PAY_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ORDER_PAY_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
};
