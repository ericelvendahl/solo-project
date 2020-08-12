const collaborators = (state = [], action) => {
  switch (action.type) {
    case "SET_COLLABORATORS":
      return action.payload;
    default:
      return state;
  }
};

// user will be on the redux state at:
// state.user
export default collaborators;
