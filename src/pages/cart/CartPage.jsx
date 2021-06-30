import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CartList from "../../components/Cart/CartList";
import "./cart.css";

function CartPage() {
  const { cart } = useSelector((state) => state.cartReducer);

  if (cart.length === 0) {
    return (
      <div id="cart-page">
        <div className="container section-padding">
          <div className="row jcsb">
            <div className="cart-page__order" style={{ maxWidth: "100%" }}>
              <CartList cartList={[]} />
            </div>
          </div>
        </div>
      </div>
    );
  }

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

  return (
    <div id="cart-page">
      <div className="container section-padding">
        <div className="row jcsb">
          <div className="cart-page__order">
            <CartList cartList={cart} />
          </div>

          <div className="cart-page__summary">
            <div className="price-summary summary-card">
              <h4>Cart Summary</h4>
              {cart.length > 0 ? (
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
              ) : (
                <p>There is no item in the cart</p>
              )}
            </div>

            <div className="cart-page-summary__footer">
              {cart.length > 0 ? (
                <Link to="/checkout" className="button dark block">
                  Proceed to checkout
                </Link>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartPage;
