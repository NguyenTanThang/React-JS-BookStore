import { Rate, Skeleton } from "antd";
import React from "react";
import ErrorBox from "../../components/Partials/ErrorBox";
import calculateRatings from "../../utils/calculateRatings";

function ReviewRatings(props) {
  const { loading, error, reviews } = props;

  if (error) {
    return (
      <div className="review-summary">
        <ErrorBox message={error} />
      </div>
    );
  }

  if (loading) {
    return (
      <div className="review-summary">
        <Skeleton active />
      </div>
    );
  }

  return (
    <div className="review-summary">
      <Rate disabled defaultValue={calculateRatings(reviews)} />
      <h2>{calculateRatings(reviews)}/5 stars</h2>
      <p>{reviews.length} reviews</p>
    </div>
  );
}

export default ReviewRatings;
