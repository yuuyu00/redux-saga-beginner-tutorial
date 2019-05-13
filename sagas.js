import { put, call, takeEvery, all } from "redux-saga/effects";
import axios from "axios";

export const delay = ms => new Promise(res => setTimeout(res, ms));

export function* helloSaga() {
  console.log("Hello Saga");
}

export function* incrementAsync() {
  yield delay(1000);
  yield put({ type: "INCREMENT" });
}

export function* watchIncrementAsync() {
  yield takeEvery("INCREMENT_ASYNC", incrementAsync);
}

export function* watchFetchPosts() {
  yield takeEvery("FETCH_POSTS", fetchPosts);
}

export function* fetchPosts() {
  const res = yield call(
    axios.get,
    "https://jsonplaceholder.typicode.com/posts"
  );
  yield console.log(res);
}

export function* watchFetchUsers() {
  yield takeEvery("FETCH_DATA", fetchUsers);
}

export function* fetchUsers() {
  const res = yield call(
    axios.get,
    "https://jsonplaceholder.typicode.com/users"
  );
  yield console.log(res);
  yield put({ type: "FETCH_POSTS" });
}

export default function* rootSagas() {
  yield all([watchFetchUsers(), watchFetchPosts()]);
}
