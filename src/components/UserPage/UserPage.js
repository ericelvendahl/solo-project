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

  state = {
    newListName: "",
  };

  addClicked = () => {
    this.props.dispatch({
      type: "ADD_NEW_LIST",
      payload: this.state.newListName,
    });
  };

  handleInputChangeFor = (propertyName) => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  };

  linkClicked = (thisID) => {
    console.log("In linkClicked, thisID is", thisID);
    this.props.dispatch({ type: "FETCH_LIST_BY_ID", payload: thisID });
    this.props.dispatch({ type: "FETCH_LIST_NAME_BY_ID", payload: thisID });
    this.props.history.push("/currenttasklist");
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
        <p>
          allTaskLists reducer is: {JSON.stringify(this.props.allTaskLists)}
        </p>
        <p>User data is {JSON.stringify(this.props.user)}</p>
        <p>
          Current task list data is {JSON.stringify(this.props.currentTaskList)}
        </p>
        <p>newListName: {JSON.stringify(this.state.newListName)}</p>
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
