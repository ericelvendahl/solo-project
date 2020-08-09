import React, { Component } from "react";
import { connect } from "react-redux";
import LogOutButton from "../LogOutButton/LogOutButton";
import { Link } from "react-router-dom";
import "./TaskListItem.css";

class TaskListItem extends Component {
  componentDidMount() {}
  deleteClicked = (id) => {
    console.log("in deleteClicked. id is", id);
    this.props.dispatch({ type: "DELETE_TASK", payload: id });
    this.props.dispatch({
      type: "FETCH_LIST_BY_ID",
      payload: this.props.currentTaskList[0].task_list_id,
    });
  };
  render() {
    return (
      <div className="task-list-item">
        <ul>
          <li>{JSON.stringify(this.props.thisItem.task_name)}</li>
          <li>{JSON.stringify(this.props.thisItem.task_description)}</li>
          <li>
            <button
              className="button-small"
              onClick={() => {
                this.deleteClicked(this.props.thisItem.id);
              }}
            >
              X
            </button>
          </li>
        </ul>
      </div>
    );
  }
}

// Instead of taking everything from state, we just want the user info.
const mapStateToProps = (state) => ({
  user: state.user,
  allTaskLists: state.allTaskLists,
  currentTaskList: state.currentTaskList,
  currentTaskListName: state.currentTaskListName,
});

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(TaskListItem);
