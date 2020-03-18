import React from "react";
import AddReview from "./AddReview";
import SingleReview from "./SingleReview";
import Toggle from "../Toggle";
import styles from "../styling/AllReviews.module.css";

const AllReviews = ({ reviews, handleSaveReview }) => {
  return (
    <div>
      {localStorage.token && (
        <Toggle buttonMessage="Leave a review">
          <AddReview handleSaveReview={handleSaveReview} />
        </Toggle>
      )}
      <h3 className={styles.h3}>Reviews</h3>
      {reviews.length !== 0 && (
        <div className={styles.reviewsContainer}>
          
          <div className={styles.allReviews}>
            
            {reviews.map(review => {
              return <SingleReview review={review} key={review._id} />;
            })}
          </div>
        </div>
      )}
      {reviews.length === 0 && (
        <div className={styles.noReviews}>
          <p className={styles.noReviewComment}>There are no reviews for this route yet. Be the first to leave one, using the button above!</p>
        </div>
      )}
    </div>
  );
};

export default AllReviews;
