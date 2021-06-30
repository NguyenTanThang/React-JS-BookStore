import React, { useState } from "react";
import { Link } from "react-router-dom";
import FavoriteBorderOutlinedIcon from "@material-ui/icons/FavoriteBorderOutlined";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ReviewList from "../../components/Review/ReviewList";
import BookList from "../../components/Book/BookList";
import { useDispatch, useSelector } from "react-redux";
import { Rate, Skeleton } from "antd";
import "./book-details.css";
import ErrorBox from "../../components/Partials/ErrorBox";
import { useEffect } from "react";
import { getBookDetails, getBooksRandom } from "../../actions/bookActions";
import createNotification from "../../utils/createNotification";
import {
  addToWishList,
  getUserWishList,
  removeFromWishList,
} from "../../actions/wishlistActions";
import ReviewForm from "./ReviewForm";
import { addToCart } from "../../actions/cartActions";
import { getBookReviews } from "../../actions/reviewActions";
import ReviewRatings from "./ReviewRatings";

function BookDetailsPage(props) {
  const bookID = props.match.params.bookID;
  const dispatch = useDispatch();
  const bookDetailsReducer = useSelector((state) => state.bookDetailsReducer);
  const authReducer = useSelector((state) => state.authReducer);
  const wishlistReducer = useSelector((state) => state.wishlistReducer);
  const bookRandomReducer = useSelector((state) => state.bookRandomReducer);
  const reviewReducer = useSelector((state) => state.reviewReducer);
  const { cart } = useSelector((state) => state.cartReducer);
  const { loading: reviewLoading, error: reviewError, reviews } = reviewReducer;
  const { loading, error, book } = bookDetailsReducer;
  const {
    loading: bookRandomLoading,
    error: bookRandomError,
    randomBooks,
  } = bookRandomReducer;
  const { userInfo } = authReducer;
  const {
    loading: wishlistLoading,
    error: wishlistError,
    wishlists,
  } = wishlistReducer;

  const [quantity, setQuantity] = useState(1);
  const [isSubmmitted, setIsSubmmitted] = useState(false);
  const [isWishlist, setIsWishlist] = useState(false);

  const handleAddToCart = () => {
    dispatch(addToCart(book, quantity));
  };

  const renderAddToCartButton = () => {
    if (cart) {
      const existed = cart.find((cartItem) => {
        return cartItem.bookID === book._id;
      });
      if (existed) {
        return (
          <div>
            <Link
              to="/cart"
              type="button"
              style={{ textAlign: "center" }}
              className="button primary"
            >
              Go to cart
            </Link>
          </div>
        );
      }
    }

    return (
      <div className="quantity-selector">
        <div className="row">
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
          <button className="add-to-cart-button button dark" onClick={handleAddToCart}>
            Add to cart
          </button>
        </div>
      </div>
    );
  };

  const handleQuantityChange = (val) => {
    if (val <= 0) {
      return createNotification("Quantity cannot be lower than 1", "error");
    }
    setQuantity(Number(val));
  };

  const handleAddToWishList = () => {
    dispatch(addToWishList(bookID));
    setIsSubmmitted(true);
  };

  const handleRemoveFromWishList = () => {
    dispatch(removeFromWishList(bookID));
    setIsSubmmitted(true);
  };

  const renderWishListButton = () => {
    if (!userInfo) {
      return <></>;
    }
    if (isWishlist) {
      return (
        <li onClick={handleRemoveFromWishList}>
          <Link className="link-with-icon aic row">
            <div className="icon">
              <FavoriteIcon />
            </div>
            <div className="text">Remove from Wishlist</div>
          </Link>
        </li>
      );
    } else {
      return (
        <li onClick={handleAddToWishList}>
          <Link className="link-with-icon aic row">
            <div className="icon">
              <FavoriteBorderOutlinedIcon />
            </div>
            <div className="text">Add to Wishlist</div>
          </Link>
        </li>
      );
    }
  };

  useEffect(() => {
    dispatch(getBookDetails(bookID));
    dispatch(getUserWishList());
    dispatch(getBooksRandom());
    dispatch(getBookReviews(bookID));
  }, [bookID, dispatch]);

  useEffect(() => {
    const existed = wishlists.find((wishlist) => {
      return wishlist.book._id === bookID;
    });
    if (existed) {
      setIsWishlist(true);
    } else {
      setIsWishlist(false);
    }
  }, [dispatch, wishlists, bookID]);

  useEffect(() => {
    if (!wishlistLoading && isSubmmitted) {
      setIsSubmmitted(false);
      if (wishlistError) {
        return createNotification(wishlistError, "error");
      }

      const existed = wishlists.find((wishlist) => {
        return wishlist.book._id === bookID;
      });
      console.log(existed);
      if (existed) {
        setIsWishlist(true);
        return createNotification("Added to your wishlist");
      } else {
        setIsWishlist(false);
        return createNotification("Removed from your wishlist");
      }
    }
  }, [isSubmmitted, wishlistLoading, wishlistError, bookID, wishlists]);

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
    <div id="book-details-page">
      <section id="book-details-page__main">
        <div className="row">
          <div className="book-details-main__image">
            <img src={book.image_url} alt={book.name} className="img-fluid" />
          </div>
          <div className="book-details-main__content">
            <h2 className="name">{book.name}</h2>
            <h4 className="author">By {book.author}</h4>
            <h3 className="price">${book.price.toFixed(2)}</h3>
            <p className="brief">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Excepteur sint occaecat.
            </p>
            {renderAddToCartButton()}

            <div className="utils">
              <ul>{renderWishListButton()}</ul>
            </div>
          </div>
        </div>
      </section>

      <section id="book-details-page__description" className="section-padding">
        <div className="container">
          <h2>Description</h2>
          <p>{book.description}</p>
        </div>
      </section>

      <section id="book-details-page__reviews" className="section-padding">
        <div className="container">
          <h2>Reviews</h2>

          <div className="book-details-review__top">
            <div className="row">
              <ReviewRatings loading={reviewLoading} error={reviewError} reviews={reviews}/>

              {userInfo && <ReviewForm bookID={bookID} />}
            </div>
          </div>

          <div className="book-details-review__main">
            <ReviewList loading={reviewLoading} error={reviewError} reviews={reviews} />
          </div>
        </div>
      </section>

      <section id="book-details-page__rec" className="section-padding">
        <div className="container">
          <h2>Customers Also Considered</h2>
          {bookRandomError && <ErrorBox message={error} />}

          {bookRandomLoading ? (
            <>
              <Skeleton active />
              <Skeleton active />
            </>
          ) : (
            <>
              <BookList books={randomBooks} />
            </>
          )}
        </div>
      </section>
    </div>
  );
}

export default BookDetailsPage;
