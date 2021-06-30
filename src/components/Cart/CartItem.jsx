import React, { useState } from "react";
import CloseIcon from "@material-ui/icons/Close";
import { useDispatch } from "react-redux";
import { removeFromCart, changeQuantity } from "../../actions/cartActions";
import createNotification from "../../utils/createNotification";
import { Link } from "react-router-dom";

function CartItem({ quantityDisabled, cartItem }) {
  const dispatch = useDispatch();

  const [quantity, setQuantity] = useState(cartItem.quantity);

  const handleRemoveFromCart = () => {
    dispatch(removeFromCart(cartItem.bookID));
  };

  const handleQuantityChange = (val) => {
    if (val <= 0) {
      return createNotification("Quantity cannot be lower than 1", "error");
    }
    setQuantity(Number(val));
    dispatch(changeQuantity(cartItem.bookID, Number(val)))
  };

  if (cartItem) {
    return (
      <tr className="cart-item">
        <td>
          <div className="cart-item__product row aic">
            <div className="image">
              <img
                src={cartItem.image_url}
                alt={cartItem.name}
                className="img-fluid"
              />
            </div>
            <div className="content">
              <Link to={`/books/${cartItem.bookID || cartItem.book}`}>
                <h4>{cartItem.name}</h4>
              </Link>
              <h6>{cartItem.author}</h6>
            </div>
          </div>
        </td>
        <td className="price">${cartItem.price}</td>
        <td className="quantity">
          {quantityDisabled ? (
            <div
              style={{
                textAlign: "center",
              }}
            >
              {quantity}
            </div>
          ) : (
            <ul className="row quantity-selector__container">
              <li
                className="decrement"
                onClick={() => handleQuantityChange(Number(quantity) - 1)}
              >
                -
              </li>
              <li className="quantity">
                <input
                  type="number"
                  min={1}
                  value={quantity}
                  defaultValue={quantity}
                  onChange={(e) => handleQuantityChange(e.target.value)}
                />
              </li>
              <li
                className="increment"
                onClick={() => handleQuantityChange(Number(quantity) + 1)}
              >
                +
              </li>
            </ul>
          )}
        </td>
        <td className="total">${cartItem.sub_total}</td>
        {!quantityDisabled && 
        <td className="actions">
          <div
            className="cart-item__delete-button"
            onClick={handleRemoveFromCart}
          >
            <CloseIcon />
          </div>
        </td>
        }
      </tr>
    );
  }

  return (
    <tr className="cart-item">
      <td>
        <div className="cart-item__product row aic">
          <div className="image">
            <img
              src="https://d3i5mgdwi2ze58.cloudfront.net/kxk6iwn543doz8jqbs2sckh2fcot"
              alt="One Hundred Years of Solitude"
              className="img-fluid"
            />
          </div>
          <div className="content">
            <h4>The Overdue Life of Amy Byler</h4>
            <h6>Kelly Harms</h6>
          </div>
        </div>
      </td>
      <td className="price">$29.99</td>
      <td className="quantity">
        {quantityDisabled ? (
          <div
            style={{
              textAlign: "center",
            }}
          >
            8
          </div>
        ) : (
          <ul className="row quantity-selector__container">
            <li className="decrement">-</li>
            <li className="quantity">
              <input type="number" min={1} max={10} />
            </li>
            <li className="increment">+</li>
          </ul>
        )}
      </td>
      <td className="total">$29.99</td>
      <td className="actions">
        <div
          className="cart-item__delete-button"
          onClick={handleRemoveFromCart}
        >
          <CloseIcon />
        </div>
      </td>
    </tr>
  );
}

export default CartItem;
