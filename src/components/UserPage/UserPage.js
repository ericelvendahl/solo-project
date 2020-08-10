import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "./UserPage.css";

class UserPage extends Component {
  componentDidMount() {
    this.props.dispatch({
      type: "FETCH_ALL_TASK_LISTS",
      payload: this.props.user.id,
    });
  }
  linkClicked = (thisID) => {
    console.log("In linkClicked, thisID is", thisID);
    this.props.dispatch({ type: "FETCH_LIST_BY_ID", payload: thisID });
    this.props.dispatch({ type: "FETCH_LIST_NAME_BY_ID", payload: thisID });
    this.props.history.push("/currenttasklist");
  };
  // this component doesn't do much to start, just renders some user info to the DOM
  render() {
    return (
      <div className="main-container">
        <h1 id="welcome">Welcome, {this.props.user.username}!</h1>
        {/* <p>Your ID is: {this.props.user.id}</p> */}
        <p><h3>Choose a list:</h3></p>
        {this.props.allTaskLists.map((x, key) => (
          <p key={key}>
            <Link
              to="/currenttasklist"
              onClick={() => {
                this.linkClicked(x.id);
              }}
            >
              {x.task_list_name}
            </Link>
          </p>
        ))}
        <h3>Add a new list:</h3>
        <input></input><button className="button-small">Add</button>
        <p>allTaskLists reducer is: {JSON.stringify(this.props.allTaskLists)}</p>
        <p>User data is {JSON.stringify(this.props.user)}</p>
        <p>
          Current task list data is {JSON.stringify(this.props.currentTaskList)}
        </p>
      </div>
    );
  }
}

// Instead of taking everything from state, we just want the user info.
const mapStateToProps = (state) => ({
  user: state.user,
  allTaskLists: state.allTaskLists,
});

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(UserPage);
