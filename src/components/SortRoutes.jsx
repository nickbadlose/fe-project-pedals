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
        <Dropdown.Item eventKey="posted/desc">Newest</Dropdown.Item>
        <Dropdown.Item eventKey="posted/asc">Oldest</Dropdown.Item>
        <Dropdown.Item eventKey="calculatedDistance/desc">
          Distance: Longest to Shortest
        </Dropdown.Item>
        <Dropdown.Item eventKey="calculatedDistance/asc">
          Distance: Shortest to Longest
        </Dropdown.Item>
        <Dropdown.Item eventKey="averageRating/desc">
          Rating: Highest to Lowest
        </Dropdown.Item>
        <Dropdown.Item eventKey="averageRating/asc">
          Rating: Lowest to Highest
        </Dropdown.Item>
      </DropdownButton>
    );
  }

  onSelect = eventKey => {
    const separatedEventKey = eventKey.split("/");
    const sort_by = separatedEventKey[0];
    const order = separatedEventKey[1];
    this.setState({ sort_by, order });
  };

  componentDidUpdate(prevProps, prevState) {
    const { sort_by, order } = this.state;
    const { sortRoutes } = this.props;
    const sortByChanged = sort_by !== prevState.sort_by;
    const orderChanged = order !== prevState.order;
    if (sortByChanged || orderChanged) {
      sortRoutes(sort_by, order);
    }
  }
}

export default SortRoutes;
