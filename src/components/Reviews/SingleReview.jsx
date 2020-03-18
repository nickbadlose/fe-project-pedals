import React from "react";
import Moment from "react-moment";

const SingleReview = ({ review }) => {
  return (
    <div>
      <p>'{review.body}'</p>
      <p>{review.user_id} gave this route {review.rating} stars!</p>
      <br></br>
    </div>
  );
};

export default SingleReview;
