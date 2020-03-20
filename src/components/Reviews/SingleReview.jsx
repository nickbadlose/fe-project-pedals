import React from "react";
import Moment from "react-moment";
import styles from "../styling/SingleReview.module.css";
import StarRatingComponent from 'react-star-rating-component';

const SingleReview = ({ review }) => {
  let reviewer;

  if (review.user_id === localStorage.username) {
    reviewer = "You";
  } else reviewer = review.user_id;

  return (
    <div className={styles.reviewContainer}>
      <p className={styles.body}>'{review.body}'</p>
      
      <StarRatingComponent className={styles.rating}
          name="rate1" 
          starCount={5}
          value={review.rating}
          editing={false}
        />
        <p className={styles.rating}>
        <span className={styles.userName}>{reviewer}</span> gave this route{" "}
        {review.rating} stars!
      </p>
      
    </div>
  );
};

export default SingleReview;
