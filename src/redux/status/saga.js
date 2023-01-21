import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import {api_get, api_post,api_put} from 'api/core'
import { STATUS_GET_LIST, STATUS_ADD_ITEM } from '../actions';

import {
  getStatusListSuccess,
  getStatusListError,
  addStatusItemSuccess,
  addStatusItemError,
} from './actions';

const getStatusListRequest = async () => {
  return api_get(`StatusType`);
};

function* getStatusListItems() {
  try {
    const response = yield call(getStatusListRequest);
    yield put(getStatusListSuccess(response.data));
  } catch (error) {
    yield put(getStatusListError(error));
  }
}

const addStatusItemRequest = async (item) => {
  return api_post(`StatusType`, item);
};

function* addStatusItem({ payload }) {
  try {
    const response = yield call(addStatusItemRequest, payload);
    //console.log(response);
    yield put(addStatusItemSuccess(response.data));
  } catch (error) {
    yield put(addStatusItemError(error));
  }
}

export function* watchGetList() {
  yield takeEvery(STATUS_GET_LIST, getStatusListItems);
}

export function* wathcAddItem() {
  yield takeEvery(STATUS_ADD_ITEM, addStatusItem);
}

export default function* rootSaga() {
  yield all([fork(watchGetList), fork(wathcAddItem)]);
}
