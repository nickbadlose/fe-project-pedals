import React from "react";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import styles from "./styling/FilterType.module.css";

const FilterType = () => {
  return (
    <DropdownButton
      id="dropdown-basic-button"
      title="Route type"
      className={styles.filterButton}
    >
      <Dropdown.Item href="/routes/scenic">Scenic</Dropdown.Item>
      <Dropdown.Item href="/routes/family%20friendly">
        Family Friendly
      </Dropdown.Item>
      <Dropdown.Item href="/routes/off-road">Off-Road</Dropdown.Item>
      <Dropdown.Item href="/routes/training">Training</Dropdown.Item>
      <Dropdown.Item href="/routes/">All</Dropdown.Item>
    </DropdownButton>
  );
};

export default FilterType;
