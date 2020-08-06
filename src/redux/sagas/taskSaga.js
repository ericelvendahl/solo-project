import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";

function* taskSaga() {
  yield takeLatest("FETCH_ALL_TASK_LISTS", fetchAllTaskLists);
  yield takeLatest("FETCH_LIST_BY_ID", fetchListByID);
} // end taskSaga

function* fetchAllTaskLists(action) {
  console.log("in fetchAllTaskLists saga");
  try {
    const response = yield axios.get("/api/task/listsbyuser/" + action.payload);
    yield put({ type: "SET_ALL_TASK_LISTS", payload: response.data });
  } catch (error) {
    console.log("All task list get request failed", error);
  }
} // end fetchAllTaskLists

function* fetchListByID(action) {
  console.log("in taskSaga fetchListByID. action.payload is", action.payload);
  try {
    // axios call for all tasks related to one specific list
    const response = yield axios.get("/api/task/list/" + action.payload);
    console.log("in taskSaga fetchListByID. response is", response);
    yield put({ type: "SET_CURRENT_TASK_LIST", payload: response.data });
  } catch (error) {
    console.log("Get task list by ID failed with error:", error);
  }
} // end fetchListByID
export default taskSaga;
