import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import styles from "./styling/SearchBox.module.css";

class SearchBox extends Component {
  state = {
    searchInput: ""
  };
  render() {
    return (
      <div className={styles.searchBox}>
        <InputGroup>
          <FormControl
            required
            placeholder="Search..."
            aria-label="Search box"
            onChange={this.handleSearch}
          />
          <InputGroup.Append>
            <Button variant="outline-secondary">Search by user</Button>
            <Button variant="outline-secondary">Search by city</Button>
          </InputGroup.Append>
        </InputGroup>
      </div>
    );
  }

  handleSearch = e => {
    this.setState({ searchInput: e.target.value });
  };
}

export default SearchBox;
