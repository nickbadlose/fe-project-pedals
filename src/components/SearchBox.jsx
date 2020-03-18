import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import FormControl from "react-bootstrap/FormControl";
import InputGroup from "react-bootstrap/InputGroup";
import styles from "./styling/SearchBox.module.css";

class SearchBox extends Component {
  state = {
    searchInput: ""
  };
  render() {
    const { searchInput } = this.state;
    return (
      <div className={styles.searchBoxBlock}>
        <InputGroup className="mb-3">
          <FormControl
            onChange={this.handleChange}
            placeholder="Search..."
            aria-label="Search box"
            aria-describedby="basic-addon2"
          />
          <InputGroup.Append>
            <Button
              onClick={() => {
                this.onClick(searchInput);
              }}
              variant="primary"
            >
              Go!
            </Button>
          </InputGroup.Append>
        </InputGroup>
      </div>
    );
  }

  handleChange = e => {
    this.setState({ searchInput: e.target.value });
  };

  onClick = searchTerm => {
    this.props.searchRoutes(searchTerm);
    this.setState({ searchInput: "" });
  };
}

export default SearchBox;
