import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import styles from "../styling/AddReview.module.css";

class AddReview extends Component {
  state = { body: "", rating: 1 };

  render() {
    const { body, rating } = this.state;
    return (
      <Form>
        <Form.Group controlId="addReview.reviewBody">
          <Form.Label className={styles.label}>Review</Form.Label>
          <Form.Control
            as="textarea"
            rows="2"
            placeholder="Tell us how you found this route"
            onChange={this.handleReviewBodyChange}
            className={styles.placeholder}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="addReview.reviewRating">
          <Form.Label className={styles.label}>Rate the route</Form.Label>
          <Form.Control
            as="select"
            onChange={this.handleReviewRatingChange}
            className={styles.placeholder}
          >
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </Form.Control>
          <div className={styles.rating}>
            <span>☆</span>
            <span>☆</span>
            <span>☆</span>
            <span>☆</span>
            <span>☆</span>
          </div>
        </Form.Group>
        <Button
          variant="primary"
          type="submit"
          onClick={e => {
            e.preventDefault();
            this.props.handleSaveReview(body, rating);
          }}
        >
          Post my review!
        </Button>
      </Form>
    );
  }

  handleReviewBodyChange = e => {
    this.setState({ body: e.target.value });
  };

  handleReviewRatingChange = e => {
    this.setState({ rating: e.target.value });
  };
}

export default AddReview;
