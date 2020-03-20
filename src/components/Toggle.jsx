import React, { Component } from "react";
import Button from "react-bootstrap/Button";

class Toggle extends Component {
  state = { isShowing: false };
  render() {
    const {isShowing} = this.state
    return (
      <div >
          {isShowing && this.props.children} 
          {!isShowing && <Button onClick={this.showing}>{this.props.buttonMessage}</Button>}
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