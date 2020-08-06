const currentTaskListReducer = (state = [], action) => {
  switch (action.type) {
    case "SET_CURRENT_TASK_LIST":
      return action.payload;
    default:
      return state;
  }
};

// user will be on the redux state at:
// state.user
export default currentTaskListReducer;
