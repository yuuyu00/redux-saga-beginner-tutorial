import test from "tape";
import axios from "axios";

import { call } from "redux-saga/effects";
import { takeEvery } from "redux-saga";
import {
  watchFetchUsers,
  watchFetchPosts,
  fetchUsers,
  fetchPosts
} from "./sagas";

test("watchFetchUsers Saga test", assert => {
  const gen = watchFetchUsers();

  assert.deepEqual(
    gen.next().value,
    takeEvery("FETCH_DATA", fetchUsers),
    "watchFetchUsers must fetch users"
  );

  assert.end();
});

test("watchFetchPosts Saga test", assert => {
  const gen = watchFetchPosts();

  assert.deepEqual(
    gen.next().value,
    takeEvery("FETCH_POSTS", fetchPosts),
    "watchFetchPosts must fetch users"
  );

  assert.end();
});

test("fetchUsers Saga test", assert => {
  const gen = fetchUsers();

  assert.deepEqual(
    gen.next().value,
    call(axios.get, "https://jsonplaceholder.typicode.com/users"),
    "fetchUsers must fetch users"
  );

  assert.end();
});

test("fetchPosts Saga test", assert => {
  const gen = fetchPosts();

  assert.deepEqual(
    gen.next().value,
    call(axios.get, "https://jsonplaceholder.typicode.com/posts"),
    "fetchPosts must fetch posts"
  );

  assert.end();
});
