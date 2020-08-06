import React, { Component } from "react";
import { connect } from "react-redux";
import LogOutButton from "../LogOutButton/LogOutButton";

class CurrentTaskListPage extends Component {
  componentDidMount() {}

  state = {
    showAddComponent: false,
    taskName: "",
    taskDescription: "",
  };

  addClicked = () => {
    console.log("in addClicked");
    this.props.dispatch({
      type: "ADD_TASK",
      payload: {
        name: this.state.taskName,
        description: this.state.taskDescription,
      },
    });
  };

  handleInputChangeFor = (propertyName) => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  }; // end handleInputChangeFor

  linkClicked = (thisID) => {
    // console.log("In linkClicked, thisID is", thisID);
    // this.props.dispatch({ type: "FETCH_LIST_BY_ID", payload: thisID });
  }; // end linkClicked

  render() {
    return (
      <div className="parent">
        <div className="child-span-12">
          Task Name:
          <input
            type="text"
            name="taskName"
            value={this.state.taskName}
            onChange={this.handleInputChangeFor("taskName")}
          />
          Description:
          <input
            type="text"
            name="taskDescription"
            value={this.state.taskDescription}
            onChange={this.handleInputChangeFor("taskDescription")}
          />
          <button className="log-in" onClick={this.addClicked}>
            Add task
          </button>
          {this.showAddComponent ? <p>true</p> : <p>false</p>}
          <p>Current task list: {JSON.stringify(this.props.currentTaskList)}</p>
          {this.props.currentTaskList.map((x, key) => (
            <p key={key}>{x.task_name}</p>
          ))}
          <p>User data is {JSON.stringify(this.props.user)}</p>
        </div>
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
