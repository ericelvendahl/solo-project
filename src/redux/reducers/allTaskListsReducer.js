const allTaskListsReducer = (state = [], action) => {
  switch (action.type) {
    case "SET_ALL_TASK_LISTS":
      return action.payload;
    default:
      return state;
  }
};

// user will be on the redux state at:
// state.user
export default allTaskListsReducer;
