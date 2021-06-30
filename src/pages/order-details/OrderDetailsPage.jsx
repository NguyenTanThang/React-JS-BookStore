import React, { useEffect, useState } from "react";
import CartList from "../../components/Cart/CartList";
import { useDispatch, useSelector } from "react-redux";
import "../cart/cart.css";
import ErrorBox from "../../components/Partials/ErrorBox";
import { Skeleton } from "antd";
import { getOrderDetails, payOrder } from "../../actions/orderActions";
import { ORDER_PAY_RESET } from "../../constants/orderConstants";
import axios from "axios";
import { PayPalButton } from "react-paypal-button-v2";

function OrderDetailsPage(props) {
  const orderID = props.match.params.orderID;
  const dispatch = useDispatch();
  const { loading, error, order } = useSelector(
    (state) => state.orderDetailsReducer
  );
  const orderPayReducer = useSelector((state) => state.orderPayReducer);
  const {
    loading: loadingPay,
    error: errorPay,
    success: successPay,
  } = orderPayReducer;

  const [sdkReady, setSdkReady] = useState(false);

  useEffect(() => {
    const addPayPalScript = async () => {
      const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/api/config/paypal`);
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://www.paypal.com/sdk/js?client-id=${data}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };

    if (!order || successPay || (order && order._id !== orderID)) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch(getOrderDetails(orderID));
    } else {
      if (!order.isPaid) {
        if (!window.paypal) {
          addPayPalScript();
        } else {
          setSdkReady(true);
        }
      }
    }
  }, [orderID, dispatch, order, successPay]);

  const successPaymentHandler = (paymentResult) => {
    dispatch(payOrder(order, paymentResult));
  };

  if (error) {
    return <ErrorBox message={error} />;
  }

  if (loading) {
    return (
      <div className="container">
        <Skeleton active />
        <Skeleton active />
        <Skeleton active />
      </div>
    );
  }

  return (
    <div id="cart-page">
      <div className="container section-padding">
        <div className="row jcsb">
          <div className="cart-page__order">
            <CartList quantityDisabled cartList={order.orderItems}/>
          </div>

          <div className="cart-page__summary">
            <div className="price-summary summary-card">
              <h4>Cart Summary</h4>
              <ul>
                <li className="row jcsb">
                  <p>Subtotal:</p>
                  <p>${order.itemsPrice}</p>
                </li>
                <li className="row jcsb">
                  <p>Tax:</p>
                  <p>${order.taxPrice}</p>
                </li>
                <li className="row jcsb">
                  <p>Shipping:</p>
                  <p>${order.shippingPrice}</p>
                </li>
                <li className="row jcsb">
                  <p>
                    <strong>Total:</strong>
                  </p>
                  <p>
                    <strong>${order.totalPrice}</strong>
                  </p>
                </li>
              </ul>
            </div>

            <div className="status-summary summary-card">
              <h4>Status</h4>
              <ul>
                <li className="row jcsb">
                  <p>
                    <strong>Paid:</strong>
                  </p>
                  <p>
                    {order.isPaid ? order.paidAt.substring(0, 10) : "Not Yet"}
                  </p>
                </li>
                <li className="row jcsb">
                  <p>
                    <strong>Status:</strong>
                  </p>
                  <p>{order.status}</p>
                </li>
                <li className="row jcsb">
                  <p>
                    <strong>Delivered:</strong>
                  </p>
                  <p>
                    {order.isDelivered
                      ? order.deliveredAt.substring(0, 10)
                      : "Not Yet"}
                  </p>
                </li>
              </ul>
            </div>

            <div className="payment-summary summary-card">
              <h4>Payment</h4>
              <ul>
                <li className="row jcsb">
                  <p>
                    <strong>Payment Method:</strong>
                  </p>
                  <p>
                    {order.paymentMethod}
                  </p>
                </li>
              </ul>
            </div>

            {order.paymentMethod === "PayPal" & !order.isPaid ? (
              <>
                {!sdkReady ? (
                  <Skeleton active />
                ) : (
                  <>
                    {errorPay && <ErrorBox message={errorPay} />}
                    {loadingPay && <Skeleton active />}
                    <PayPalButton
                      amount={order.totalPrice}
                      onSuccess={successPaymentHandler}
                    ></PayPalButton>
                  </>
                )}
              </>
            ) : (<></>)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderDetailsPage;
