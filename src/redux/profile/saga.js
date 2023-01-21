import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import {api_get, api_post,api_put} from 'api/core'
import { PROFILE_GET_LIST, PROFILE_ADD_ITEM } from '../actions';

import {
  getProfileListSuccess,
  getProfileListError,
  addProfileItemSuccess,
  addProfileItemError,
} from './actions';

const getProfileListRequest = async () => {
  return api_get(`Profile?store=SaleService`);
};

function* getProfileListItems() {
  try {
    const response = yield call(getProfileListRequest);
    yield put(getProfileListSuccess(response.data));
  } catch (error) {
    yield put(getProfileListError(error));
  }
}

const addProfileItemRequest = async (item) => {
  return api_post(`Profile`, JSON.stringify(item));
};

const editProfileItemRequest = async (item) => {
  return api_put(`Profile`, item);
};

function* addProfileItem({ payload }) {
  try {
    const response = yield call(addProfileItemRequest, payload);
    //console.log(response.data);
    yield put(addProfileItemSuccess(response.data));
  } catch (error) {
    yield put(addProfileItemError(error));
  }
}

export function* watchGetList() {
  yield takeEvery(PROFILE_GET_LIST, getProfileListItems);
}

export function* wathcAddItem() {
  yield takeEvery(PROFILE_ADD_ITEM, addProfileItem);
}

export default function* rootSaga() {
  yield all([fork(watchGetList), fork(wathcAddItem)]);
}
