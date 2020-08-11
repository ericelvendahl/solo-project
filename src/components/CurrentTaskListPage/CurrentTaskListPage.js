import React, { Component } from "react";
import { connect } from "react-redux";
//import LogOutButton from "../LogOutButton/LogOutButton";
import TaskListItem from "../TaskListItem/TaskListItem";

class CurrentTaskListPage extends Component {
  componentDidMount() {

  }
  componentDidUpdate(prevProps) {
    // if there are no tasks in the current list (it is new), do not try to retrieve tasks
    if (typeof this.props.currentTaskList[0] !== 'undefined') {
      if (prevProps.currentTaskList !== this.props.currentTaskList) {
        this.props.dispatch({
          type: "FETCH_LIST_BY_ID",
          payload: this.props.currentTaskList[0].task_list_id,
        });
        this.props.dispatch({
          type: "FETCH_LIST_NAME_BY_ID",
          payload: this.props.currentTaskList[0].task_list_id,
        });
      }
    }
  }

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
        id: this.props.currentTaskListName.id,
      },
    });
    this.props.dispatch({
      type: "FETCH_LIST_BY_ID",
      payload: this.props.currentTaskListName.id,
    });
    this.setState({
      taskName: "",
      taskDescription: "",
    });
  }; // end addClicked

  deleteClicked = (id) => {
    console.log("in deleteClicked. id is", id);
    this.props.dispatch({ type: "DELETE_TASK", payload: id });
    this.props.dispatch({
      type: "FETCH_LIST_BY_ID",
      payload: this.props.currentTaskList[0].task_list_id,
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

  renameClicked = () => {
    const enteredName = prompt("Enter a new name for this list");
    console.log(enteredName);
    if (enteredName !== null) {
      this.props.dispatch({
        type: "UPDATE_LIST_NAME",
        payload: {
          name: enteredName,
          id: this.props.currentTaskList[0].task_list_id,
        },
      });
    }
  };

  render() {
    return (
      <div className="parent main-container">
        <div className="child-span-12">
          <h2>
            {JSON.stringify(this.props.currentTaskListName.name)}
            <span>
              <button className="button-small" onClick={this.renameClicked}>
                Rename
              </button>
            </span>
          </h2>

          <h3>Add a new task:</h3>
          <p>
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
            <button className="button-small" onClick={this.addClicked}>
              Add task
            </button>
          </p>
          {/* {this.showAddComponent ? <p>true</p> : <p>false</p>} */}

          {this.props.currentTaskList.map((x, key) => (
            // <p key={key}>
            //   <b>{x.task_name}</b>--{x.task_description}
            //   <span>&nbsp;</span>
            //   <button
            //     onClick={() => {
            //       this.deleteClicked(x.id);
            //     }}
            //   >
            //     X
            //   </button>
            // </p>
            <TaskListItem thisItem={x}></TaskListItem>
          ))}
          <p>User data is {JSON.stringify(this.props.user)}</p>
          <p>currentTaskList is {JSON.stringify(this.props.currentTaskList)}</p>
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
  currentTaskListName: state.currentTaskListName,
});

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(CurrentTaskListPage);
