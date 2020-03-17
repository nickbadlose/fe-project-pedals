import React, { Component } from "react";
import { checkUserExists } from "../utils/utils";
import * as api from "../api";

class SignUp extends Component {
  state = { username: "", password: "", userExists: false, users: [] };
  render() {
    const { username, password, userExists } = this.state;
    const { signUp } = this.props;
    return (
      <div>
        <form
          onSubmit={e => {
            e.preventDefault();
            signUp(e, username, password);
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
          {userExists ? (
            <>
              <button disabled>Sign up</button> <p>Username is taken</p>{" "}
            </>
          ) : (
            <button>Sign up</button>
          )}
        </form>
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
