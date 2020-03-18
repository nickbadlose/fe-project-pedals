import React, { Component } from "react";
import { checkUserExists } from "../utils/utils";
import * as api from "../api";
import styles from "../components/styling/SignUp.module.css";

class SignUp extends Component {
  state = { username: "", password: "", userExists: false, users: [] };
  render() {
    const { username, password, userExists } = this.state;
    const { signUp } = this.props;
    return (
      <div className={styles.pageContainer}>
        <div className={styles.signUpForm}>
          <h2 className={styles.h2}>Create an account</h2>
          <form
            onSubmit={e => {
              e.preventDefault();
              signUp(e, username, password);
            }}
          >
            <label className={styles.inputLabel}>
              Username:{" "}
              <input
                type="text"
                onChange={e => {
                  this.handleChange(e, "username");
                }}
                required
                className={styles.inputBox}
              />
            </label>
            <label className={styles.inputLabel}>
              Password:{" "}
              <input
                type="password"
                onChange={e => {
                  this.handleChange(e, "password");
                }}
                required
                className={styles.inputBox}
              />
            </label>
            {userExists ? (
              <>
                <button disabled className={styles.signUpButton}>Sign up</button> <p>Username is taken</p>{" "}
              </>
            ) : (
                <button className={styles.signUpButton}>Go!</button>
            )}
          </form>
        </div>
      </div>
    );
  }

  componentDidMount() {
    const { fetchUsers } = this;
    fetchUsers();
  }

  fetchUsers = () => {
    api.getUsers().then(users => {
      this.setState({ users });
    });
  };

  handleChange = (e, input) => {
    const { users } = this.state;
    if (input === "username" && checkUserExists(users, e.target.value)) {
      this.setState({ userExists: false });
    } else if (input === "username") this.setState({ userExists: true });

    this.setState({ [input]: e.target.value });
  };
}

export default SignUp;
