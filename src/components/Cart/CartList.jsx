import React from "react";
import { Link } from "react-router-dom";
import ErrorBox from "../Partials/ErrorBox";
import CartItem from "./CartItem";
import "./cart.css";

function CartList({quantityDisabled, cartList}) {
    const renderCartItems = () => {
        return cartList.map(cartItem => {
          return <CartItem key={cartItem.bookID || cartItem.book} cartItem={cartItem} quantityDisabled={quantityDisabled}/>
        })
    }

    if (cartList.length === 0) {
      return <div style={{textAlign:'center'}}>
        <ErrorBox message="Currently, there is no item in your cart" />
        <div style={{marginBottom: "30px"}}></div>
        <Link to="/browse" className="button primary">Browse For Them Now</Link>
      </div>
    }

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Product</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
            {renderCartItems()}
        </tbody>
      </table>
    </div>
  );
}

export default CartList;
