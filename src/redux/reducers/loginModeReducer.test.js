import loginModeReducer from "./loginModeReducer";
//import { exampleBadSecret } from "../../../server/constants/warnings";

describe("Testing the loginModeReducer...", () => {
  test("test initial state is login", () => {
    // Test initialization, don't really care about the action
    const action = { type: "test" };
    // Test initialization, so state should be undefined
    const previousState = undefined;
    // Output should be our state value
    let newState = loginModeReducer(previousState, action);
    expect(newState).toEqual("login");
  });
  test("test register sets to register", () => {
    // Test initialization, don't really care about the action
    const action = { type: "SET_TO_REGISTER_MODE" };
    // Test initialization, so state should be undefined
    const previousState = undefined;
    // Output should be our state value
    let newState = loginModeReducer(previousState, action);
    expect(newState).toEqual("register");
  });
});
