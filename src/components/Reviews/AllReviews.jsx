import React, { Component } from "react";
import AddReview from "./AddReview";

class AllReviews extends Component {
  state = {
    reviews: [
      {
        user_id: "jessjelly",
        body: "I like this route",
        rating: 4,
        route_id: "5e68ffe0901eab60c9eeca40"
      },
      {
        user_id: "tickle122",
        body: "I hate this route",
        rating: 0,
        route_id: "5e68ffe0901eab60c9eeca40"
      }
    ]
  };
  render() {
    return (
      <div>
        <AddReview />
        <p>Reviews here</p>
      </div>
    );
  }
}

export default AllReviews;
