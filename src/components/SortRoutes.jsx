import React, { Component } from "react";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import styles from "./styling/SortRoutes.module.css";

class SortRoutes extends Component {
  state = {
    sort_by: "averageRating",
    order: "desc"
  };
  render() {
    return (
      <DropdownButton
        id="dropdown-basic-button"
        title="Sort by"
        className={styles.sortButton}
        onSelect={this.onSelect}
      >
        <Dropdown.Item eventKey="calculatedDistance">Distance</Dropdown.Item>
        <Dropdown.Item eventKey="averageRating">Average Rating</Dropdown.Item>
        <Dropdown.Item eventKey="posted">Posted</Dropdown.Item>
      </DropdownButton>
    );
  }

  onSelect = e => {
    this.setState({ sort_by: e });
  };

  componentDidUpdate(prevProps, prevState) {
    const { sort_by } = this.state;
    const { sortRoutes } = this.props;
    const sortByChanged = sort_by !== prevState.sort_by;
    if (sortByChanged) {
      sortRoutes(sort_by);
    }
  }
}

export default SortRoutes;
