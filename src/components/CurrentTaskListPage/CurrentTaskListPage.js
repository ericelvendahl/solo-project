import React, { Component } from "react";
import { connect } from "react-redux";
import LogOutButton from "../LogOutButton/LogOutButton";

class CurrentTaskListPage extends Component {
  componentDidMount() {}
  linkClicked = (thisID) => {
    // console.log("In linkClicked, thisID is", thisID);
    // this.props.dispatch({ type: "FETCH_LIST_BY_ID", payload: thisID });
  };
  // this component doesn't do much to start, just renders some user info to the DOM
  render() {
    return (
      <div>
        <LogOutButton className="log-in" />
        <p>Current task list: {JSON.stringify(this.props.currentTaskList)}</p>
        {this.props.currentTaskList.map((x, key) => (
          <p key={key}>
            {x.task_name}
          </p>
        ))}
        <p>User data is {JSON.stringify(this.props.user)}</p>
      </div>
    );
  }
}

// Instead of taking everything from state, we just want the user info.
const mapStateToProps = (state) => ({
  user: state.user,
  allTaskLists: state.allTaskLists,
  currentTaskList: state.currentTaskList,
});

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(CurrentTaskListPage);
