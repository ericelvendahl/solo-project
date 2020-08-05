import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";

function* taskSaga() {
  yield takeLatest("FETCH_ALL_TASK_LISTS", fetchAllTaskLists);
}

function* fetchAllTaskLists(action) {
  console.log("in fetchAllTaskLists saga");
  try {
    const response = yield axios.get("/api/task/list/" + action.payload);

    // now that the session has given us a user object
    // with an id and username set the client-side user object to let
    // the client-side code know the user is logged in
    yield put({ type: "SET_ALL_TASK_LISTS", payload: response.data });
  } catch (error) {
    console.log("All task list get request failed", error);
  }
}

export default taskSaga;
