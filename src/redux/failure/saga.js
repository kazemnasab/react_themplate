import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import {api_get, api_post,api_put} from 'api/core'
import { FAILURE_GET_LIST, FAILURE_ADD_ITEM } from '../actions';

import {
  getFailureListSuccess,
  getFailureListError,
  addFailureItemSuccess,
  addFailureItemError,
} from './actions';

const getFailureListRequest = async () => {
  return api_get(`Failure`);
};

function* getFailureListItems() {
  try {
    const response = yield call(getFailureListRequest);
    yield put(getFailureListSuccess(response.data));
  } catch (error) {
    yield put(getFailureListError(error));
  }
}

const addFailureItemRequest = async (item) => {
  return api_post(`Failure`, item);
};

const editFailureItemRequest = async (item) => {
  return api_put(`Failure`, item);
};

function* addFailureItem({ payload }) {
  try {
    const response = yield call(addFailureItemRequest, payload);
    //console.log(response);
    yield put(addFailureItemSuccess(response.data));
  } catch (error) {
    yield put(addFailureItemError(error));
  }
}

export function* watchGetList() {
  yield takeEvery(FAILURE_GET_LIST, getFailureListItems);
}

export function* wathcAddItem() {
  yield takeEvery(FAILURE_ADD_ITEM, addFailureItem);
}

export default function* rootSaga() {
  yield all([fork(watchGetList), fork(wathcAddItem)]);
}
