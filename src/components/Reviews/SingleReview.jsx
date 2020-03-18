import React from "react";
import Moment from "react-moment";

const SingleReview = ({ review }) => {
  let reviewer;

  if (review.user_id === localStorage.username) {
    reviewer = 'You'
  } else reviewer = review.user_id

  return (
    <div>
      <p>'{review.body}'</p>
      <p>{reviewer} gave this route {review.rating} stars!</p>
      <br></br>
    </div>
  );
};

export default SingleReview;
