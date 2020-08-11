import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";

function* taskSaga() {
  yield takeLatest("ADD_TASK", addTask);
  yield takeLatest("ADD_NEW_LIST", addNewList);
  yield takeLatest("DELETE_TASK", deleteTask);
  yield takeLatest("FETCH_ALL_TASK_LISTS", fetchAllTaskLists);
  yield takeLatest("FETCH_LIST_BY_ID", fetchListByID);
  yield takeLatest("FETCH_LIST_NAME_BY_ID", fetchListNameByID);
  yield takeLatest("UPDATE_LIST_NAME", updateListName);
} // end taskSaga

function* addNewList(action) {
  console.log("in addNewList saga with action.payload of", action.payload);
  try {
    yield axios.post("/api/task/list/add", {
      name: action.payload.name,
      id: action.payload.id,
    });
    // set currentTaskListReducer to newly created list
    // yield put({
    //   type: "SET_CURRENT_TASK_LIST",
    //   payload: [
    //     {
    //       id: 8,
    //       task_list_id: 3,
    //       task_name: "Get Cat Food",
    //       task_description: "Meow Meow Hungry Meow Meow",
    //       task_claimed: false,
    //       task_complete: false,
    //     },
    //   ],
    // });
  } catch (error) {
    console.log("Add new list POST failed in saga with error:", error);
  }
}

function* addTask(action) {
  console.log("in addTask saga");
  try {
    yield axios.post("/api/task/add/", action.payload);
  } catch (error) {
    console.log("Add task POST failed in saga with error:", error);
  }
} // end addTask

function* deleteTask(action) {
  console.log("in deleteTask saga with action.payload of", action.payload);
  try {
    yield axios.delete("/api/task/" + action.payload);
  } catch (error) {
    console.log("Error in deleteTask saga axios call. Error is", error);
  }
} // end deleteTask

// fetches all tasks lists for a certain user
function* fetchAllTaskLists(action) {
  console.log("in fetchAllTaskLists saga");
  try {
    const response = yield axios.get("/api/task/listsbyuser/" + action.payload);
    yield put({ type: "SET_ALL_TASK_LISTS", payload: response.data });
  } catch (error) {
    console.log("All task list get request failed", error);
  }
} // end fetchAllTaskLists

// fetches one task list by its ID
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

function* fetchListNameByID(action) {
  console.log(
    "in taskSaga fetchListNameByID. action.payload is",
    action.payload
  );
  try {
    // axios call for current task list name
    const response = yield axios.get("/api/task/listname/" + action.payload);
    console.log("in taskSaga fetchListNameByID. response is", response);
    yield put({
      type: "SET_CURRENT_TASK_LIST_NAME",
      payload: { name: response.data[0].task_list_name, id: action.payload }
    });
  } catch (error) {
    console.log("Get task list name by ID failed with error:", error);
  }
} // end fetchListNameByID

function* updateListName(action) {
  console.log("in addTask saga. action.payload is", action.payload);
  try {
    yield axios.post("/api/task/updatelistname", action.payload);
  } catch (error) {
    console.log("Add task POST failed in saga with error:", error);
  }
} // end addTask

export default taskSaga;
