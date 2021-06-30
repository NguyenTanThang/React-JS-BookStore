import React, { useEffect, useState } from "react";
import ReviewItem from "./ReviewItem";
import "./review.css";
import { useSelector, useDispatch } from "react-redux";
import { getBookReviews } from "../../actions/reviewActions";
import ErrorBox from "../Partials/ErrorBox";
import { Skeleton } from "antd";
import { paginate } from "../../utils/pagination";
import Paginator from "../Partials/Paginator";

function ReviewList(props) {
  const { loading, error, reviews } = props;

  const [currentPage, setCurrentPage] = useState(1);
  const [currentReviews, setCurrentReviews] = useState([]);
  const [pageObjectGlobal, setPageObjectGlobal] = useState({});

  useEffect(() => {
    if (!loading && !error) {
      let currentReviewsData = reviews;

      const pageObject = paginate(currentReviewsData.length, currentPage, 5, 4);
      currentReviewsData = currentReviewsData.slice(
        pageObject.startIndex,
        pageObject.endIndex + 1
      );

      setPageObjectGlobal(pageObject);
      setCurrentReviews(currentReviewsData);
    }
  }, [currentPage, reviews, loading, error]);

  const renderReviewItems = () => {
    if (reviews && reviews.length > 0) {
      return currentReviews.map((reviewItem) => {
        return <ReviewItem reviewItem={reviewItem} />;
      });
    } else {
      return (
        <></>
      );
    }
  };

  const changePageNumber = (pageNum) => {
    setCurrentPage(pageNum);
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
    <div className="row review-list">
      {pageObjectGlobal.totalItems === 0 ? (
        <></>
      ) : (
        <p>{`${pageObjectGlobal.startIndex + 1} -
        ${pageObjectGlobal.endIndex + 1} of ${
          pageObjectGlobal.totalItems
        } reviews`}</p>
      )}
      {renderReviewItems()}

      <div>
        <Paginator
          pageObject={pageObjectGlobal}
          onChangePageNumber={changePageNumber}
        />
      </div>
    </div>
  );
}

export default ReviewList;
