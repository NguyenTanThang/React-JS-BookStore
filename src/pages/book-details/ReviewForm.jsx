import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBookDetails } from "../../actions/bookActions";
import { addReview } from "../../actions/reviewActions";
import Ratings from "../../components/Partials/Ratings";
import createNotification from "../../utils/createNotification";

function ReviewForm(props) {
  const bookID = props.bookID;
  const dispatch = useDispatch();
  const reviewReducer = useSelector((state) => state.reviewReducer);
  const { loading, error } = reviewReducer;

  const [reviewStar, setReviewStar] = useState(0);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [isSubmmited, setIsSummitted] = useState(false);

  useEffect(() => {
    if (isSubmmited) {
      if (!loading && !error) {
        createNotification("Successfully created a review");
      } else if (!loading && error) {
        setIsSummitted(false);
        createNotification(error, "error");
      } else {
      }

      setIsSummitted(false);
    }
  }, [isSubmmited, loading, error, dispatch, bookID]);

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(
      addReview({
        bookID,
        star: reviewStar,
        title,
        body,
      })
    );

    setReviewStar(0);
    setTitle("");
    setBody("");
    setIsSummitted(true);
  };

  return (
    <div className="review-form">
      <h4>Write a review</h4>
      <form action="#" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="">Select a rating</label>
          <Ratings handleChange={setReviewStar} currentStar={reviewStar} />
        </div>
        <div className="form-group">
          <label htmlFor="">
            Details please! Your review helps other shoppers.
          </label>
          <textarea
            name="body"
            id="body"
            value={body}
            onChange={(e) => {
              setBody(e.target.value);
            }}
            rows="10"
            placeholder="What did you like or dislike? What should other shoppers know before buying?"
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="">Add a title</label>
          <input
            name="title"
            id="title"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            type="text"
            placeholder="3000 characters remaining"
            required
          />
        </div>
        <div className="form-group">
          <button type="submit" className="button dark">
            Submit review
          </button>
        </div>
      </form>
    </div>
  );
}

export default ReviewForm;
