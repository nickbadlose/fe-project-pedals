import React, { Component } from "react";
import Button from "react-bootstrap/Button";

class Toggle extends Component {
  state = { isShowing: false };
  render() {
    return (
      <div >
        <Button onClick={this.showing}>{this.props.buttonMessage}</Button>
          {this.state.isShowing && this.props.children}
      </div>
    );
  }

  showing = () => {
    this.setState(currentState => {
      return { isShowing: !currentState.isShowing };
    });
  };
}

export default Toggle;