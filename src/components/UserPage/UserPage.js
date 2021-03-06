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
    // this.props.dispatch({
    //   type: "SET_CURRENT_TASK_LIST",
    //   payload: [
    //     {
    //       id: 1,
    //       task_claimed: false,
    //       task_complete: false,
    //       task_description: "default",
    //       task_list_id: 1,
    //       task_name: "default",
    //     },
    //   ],
    // });
  }
  componentDidUpdate() {
    this.props.dispatch({
      type: "FETCH_ALL_TASK_LISTS",
      payload: this.props.user.id,
    });
  }

  state = {
    newListName: "",
  };

  addClicked = () => {
    this.props.dispatch({
      type: "ADD_NEW_LIST",
      payload: { name: this.state.newListName, id: this.props.user.id },
    });
  };

  handleInputChangeFor = (propertyName) => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  };

  linkClicked = (thisId) => {
    console.log("In linkClicked, thisId is", thisId);
    this.props.dispatch({ type: "FETCH_LIST_BY_ID", payload: thisId });
    this.props.dispatch({ type: "FETCH_LIST_NAME_BY_ID", payload: thisId });
    this.props.history.push(`/currenttasklist/${thisId}`);
  };

  render() {
    return (
      <div className="main-container">
        <h1 id="welcome">Welcome, {this.props.user.username}!</h1>
        {/* <p>Your ID is: {this.props.user.id}</p> */}
        <p>
          <h3>Choose a list:</h3>
        </p>
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
        <input
          type="text"
          name="newListName"
          value={this.state.newListName}
          onChange={this.handleInputChangeFor("newListName")}
        ></input>
        <button className="button-small" onClick={this.addClicked}>
          Add
        </button>
        {/* reducer output for debugging:
        <p>
          allTaskLists reducer is: {JSON.stringify(this.props.allTaskLists)}
        </p>
        <p>User data is {JSON.stringify(this.props.user)}</p>
        <p>
          Current task list data is {JSON.stringify(this.props.currentTaskList)}
        </p>
        <p>newListName: {JSON.stringify(this.state.newListName)}</p> */}
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
