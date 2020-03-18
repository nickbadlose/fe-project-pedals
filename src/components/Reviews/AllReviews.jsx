import React from "react";
import AddReview from "./AddReview";
import SingleReview from "./SingleReview";

const AllReviews = ({reviews}) => {
    return (
      <div>
        <AddReview />
        {reviews.map(review => {
          return <SingleReview review={review} />
        })}
      </div>
    );
}

export default AllReviews;
