import React, { useState, useEffect } from "react";
import { message, Radio, Tooltip } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { addOrder } from "../../actions/orderActions";
import "./checkout.css";
import createNotification from "../../utils/createNotification";
import { clearCart } from "../../actions/cartActions";

function CheckoutPage(props) {
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.cartReducer);
  const { userInfo } = useSelector((state) => state.authReducer);
  const { loading, error, createdOrder } = useSelector((state) => state.addOrderReducer);

  if (userInfo) {
    props.history.push("/signin");
  }

  if (cart.length === 0) {
    props.history.push("/browse");
  }

  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [additionalNote, setAdditionalNote] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const onChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const toPrice = (number) => {
    return Number(number.toFixed(2));
  };

  const subTotalPrice = toPrice(
    cart.reduce((a, c) => {
      return a + c.quantity * c.price;
    }, 0)
  );

  const shippingPrice = subTotalPrice > 100 ? 4.99 : 0;
  const taxPrice = toPrice(subTotalPrice * 0.1);
  const totalPrice = toPrice(subTotalPrice + taxPrice + shippingPrice);

  const handleCreateOrder = () => {
    dispatch(
      addOrder({
        orderItems: cart.map(cartItem => {
          return {
            ...cartItem,
            book: cartItem.bookID
          }
        }),
        shippingAddress: {
          fullName: fullName,
          address: address,
          city: city,
          postalCode: postalCode,
          country: country,
        },
        paymentMethod: paymentMethod,
        itemsPrice: subTotalPrice,
        shippingPrice: shippingPrice,
        taxPrice: taxPrice,
        totalPrice: totalPrice,
        additionalNote: additionalNote,
      })
    );

    setIsSubmitted(true);
  };

  useEffect(() => {
    if (isSubmitted) {
      if (loading) {
        return message.loading("Placing your order", 0);
      }

      message.destroy();

      setIsSubmitted(false);

      if (!loading && !error) {
        createNotification("Successfully placed an order");
        dispatch(clearCart());
        return props.history.push(`/order-details/${createdOrder._id}`)
      } else if (!loading && error) {
        createNotification(error, "error");
      } else {
      }
    }
  }, [isSubmitted, loading, error, dispatch, createdOrder, props.history]);

  return (
    <div id="checkout-page">
      <div className="container section-padding">
        <div className="row jcsb">
          <div className="checkout-page__address-form">
            <form action="#">
              <h2>Delivery Details</h2>

              <div className="form-group">
                <label htmlFor="">Full Name:</label>
                <input
                  type="text"
                  name="fullName"
                  id="fullName"
                  placeholder="Full Name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="">Address:</label>
                <input
                  type="text"
                  name="address"
                  id="address"
                  placeholder="Address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="">City:</label>
                <input
                  type="text"
                  name="city"
                  id="city"
                  placeholder="City"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="">Country:</label>
                <input
                  type="text"
                  name="country"
                  id="country"
                  placeholder="Country"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="">Postal Code:</label>
                <input
                  type="text"
                  name="postalCode"
                  id="postalCode"
                  placeholder="Postal Code"
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="">Additional Notes (optional):</label>
                <textarea
                  name="additionalNote"
                  id="additionalNote"
                  placeholder="Additional Note"
                  value={additionalNote}
                  onChange={(e) => setAdditionalNote(e.target.value)}
                  required
                  rows="10"
                ></textarea>
              </div>
            </form>
          </div>

          <div className="checkout-page__summary ">
            <div className="order-summary summary-card">
              <h4>Order Summary</h4>
              <ul>
                {cart.map((cartItem) => {
                  return (
                    <li className="row jcsb" key={cartItem.bookID}>
                      <p>
                        <strong>
                          {cartItem.name} by {cartItem.author}
                        </strong>
                      </p>
                      <p>x {cartItem.quantity}</p>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="price-summary summary-card">
              <h4>Cart Summary</h4>
              <ul>
                <li className="row jcsb">
                  <p>Subtotal:</p>
                  <p>${subTotalPrice}</p>
                </li>
                <li className="row jcsb">
                  <p>Tax:</p>
                  <p>${taxPrice}</p>
                </li>
                <li className="row jcsb">
                  <p>Shipping:</p>
                  <p>${shippingPrice}</p>
                </li>
                <li className="row jcsb">
                  <p>
                    <strong>Total:</strong>
                  </p>
                  <p>
                    <strong>${totalPrice}</strong>
                  </p>
                </li>
              </ul>
            </div>

            <div className="payment-summary summary-card">
              <h4>Payment</h4>
              <Radio.Group onChange={onChange} defaultValue={"COD"}>
                <ul>
                  <li>
                    <Tooltip title="Pay with cash upon delivery.">
                      <Radio value={"COD"}>Cash on delivery</Radio>
                    </Tooltip>
                  </li>
                  <li>
                    <Tooltip title="Make your payment directly via your paypal account.">
                      <Radio value={"PayPal"}>PayPal payment</Radio>
                    </Tooltip>
                  </li>
                </ul>
              </Radio.Group>
            </div>

            <div className="cart-page-summary__footer">
              <button
                className="button dark block"
                disabled={loading}
                onClick={handleCreateOrder}
              >
                Place order
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckoutPage;
