import React, { Component } from "react";
import { connect } from "react-redux";
import LogOutButton from "../LogOutButton/LogOutButton";

class UserPage extends Component {
  componentDidMount() {
    this.props.dispatch({
      type: "FETCH_ALL_TASK_LISTS",
      payload: this.props.user.id,
    });
    //payload: this.props.state.user.id,
  }
  // this component doesn't do much to start, just renders some user info to the DOM
  render() {
    return (
      <div>
        <h1 id="welcome">Welcome, {this.props.user.username}!</h1>
        <p>Your ID is: {this.props.user.id}</p>
        <LogOutButton className="log-in" />
        <p>Your task lists are: {JSON.stringify(this.props.task)}</p>
        <p>User data is {JSON.stringify(this.props.user)}</p>
      </div>
    );
  }
}

// Instead of taking everything from state, we just want the user info.
const mapStateToProps = (state) => ({
  user: state.user,
  task: state.task,
});

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(UserPage);
