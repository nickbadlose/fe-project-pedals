import React from "react";
import Moment from "react-moment";
import styles from "../styling/SingleReview.module.css"

const SingleReview = ({ review }) => {
  return (
    <div className={styles.reviewContainer}>
      <p className={styles.body}>'{review.body}'</p>
      <p className={styles.rating}><span className={styles.userName}>{review.user_id}</span> gave this route {review.rating} stars!</p>
      <br></br>
    </div>
  );
};

export default SingleReview;
