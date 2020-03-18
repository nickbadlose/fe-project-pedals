import React from "react";
import AddReview from "./AddReview";
import SingleReview from "./SingleReview";
import Toggle from '../Toggle'

const AllReviews = ({reviews, handleSaveReview}) => {
    return (
      <div>
        {localStorage.token && <Toggle buttonMessage='Leave a review!'><AddReview handleSaveReview={handleSaveReview}/></Toggle>}
        <br></br>
        {reviews.map(review => {
          return <SingleReview review={review} key={review._id}/>
        })}
      </div>
    );
}

export default AllReviews;
