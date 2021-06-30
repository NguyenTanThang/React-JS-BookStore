import { Skeleton } from "antd";
import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserWishList } from "../../actions/wishlistActions";
import BookList from "../../components/Book/BookList";
import ErrorBox from "../../components/Partials/ErrorBox";

function WishListScreen() {
  const dispatch = useDispatch();
  const wishlistReducer = useSelector((state) => state.wishlistReducer);
  const { loading, error, wishlists } = wishlistReducer;
  const [bookList, setBookList] = useState([])

  useEffect(() => {
    dispatch(getUserWishList());
  }, [dispatch]);
  
  useEffect(() => {
    if (!loading && !error) {
        const bookListLocal = wishlists.map(wishlist => {
            return wishlist.book;
        });
        setBookList(bookListLocal);
    }
  }, [wishlists, loading, error])

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
    <div id="wish-list-screen">
      <BookList books={bookList} />
    </div>
  );
}

export default WishListScreen;
