const currentTaskListNameReducer = (state = [], action) => {
  switch (action.type) {
    case "SET_CURRENT_TASK_LIST_NAME":
      return action.payload;
    default:
      return state;
  }
};

// user will be on the redux state at:
// state.user
export default currentTaskListNameReducer;
