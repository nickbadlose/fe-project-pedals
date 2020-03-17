import React, { Component } from "react";
import styles from "./styling/LogIn.module.css";


class LogIn extends Component {
  state = { username: "", password: "" };
  render() {
    const { username, password } = this.state;
    const { logUserIn, invalidUser } = this.props;
    return (
      <div className={styles.pageContainer}>
        <div className={styles.signInForm}>
          <h2 className={styles.h2}>Sign In</h2>
          <form
            onSubmit={e => {
              logUserIn(e, username, password);
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
            <button className={styles.signInButton}>Go!</button>
            {invalidUser && <p>Invalid username or password!</p>}
          </form>
        </div>
      </div>
    );
  }

  handleChange = (e, input) => {
    this.setState({ [input]: e.target.value });
  };
}

export default LogIn;
