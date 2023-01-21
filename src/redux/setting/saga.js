import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import {api_get, api_post,api_put} from 'api/core'
import { SETTING_GET_LIST, SETTING_ADD_ITEM } from '../actions';

import {
  getSettingListSuccess,
  getSettingListError,
  addSettingItemSuccess,
  addSettingItemError,
} from './actions';

const getSettingListRequest = async () => {
  return api_get(`Setting`);
};

function* getSettingListItems() {
  try {
    const response = yield call(getSettingListRequest);
    yield put(getSettingListSuccess(response.data));
  } catch (error) {
    yield put(getSettingListError(error));
  }
}

const addSettingItemRequest = async (item) => {
  return api_post(`Setting`, item);
};

const editSettingItemRequest = async (item) => {
  return api_put(`Setting`, item);
};

function* addSettingItem({ payload }) {
  try {
    const response = yield call(addSettingItemRequest, payload);
    //console.log(response);
    yield put(addSettingItemSuccess(response.data));
  } catch (error) {
    yield put(addSettingItemError(error));
  }
}

export function* watchGetList() {
  yield takeEvery(SETTING_GET_LIST, getSettingListItems);
}

export function* wathcAddItem() {
  yield takeEvery(SETTING_ADD_ITEM, addSettingItem);
}

export default function* rootSaga() {
  yield all([fork(watchGetList), fork(wathcAddItem)]);
}
