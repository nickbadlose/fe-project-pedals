import React, { Component } from "react";

class LogIn extends Component {
  state = { username: "", password: "" };
  render() {
    const { username, password } = this.state;
    const { logUserIn } = this.props;
    return (
      <div>
        <form
          onSubmit={e => {
            logUserIn(e, username, password);
          }}
        >
          <label>
            Username:{" "}
            <input
              type="text"
              onChange={e => {
                this.handleChange(e, "username");
              }}
              required
            />
          </label>
          <label>
            Password:{" "}
            <input
              type="password"
              onChange={e => {
                this.handleChange(e, "password");
              }}
              required
            />
          </label>
          <button>Sign in</button>
        </form>
      </div>
    );
  }

  handleChange = (e, input) => {
    this.setState({ [input]: e.target.value });
  };
}

export default LogIn;
