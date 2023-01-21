import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import {api_get, api_post,api_put} from 'api/core'
import { PRODUCT_GET_LIST, PRODUCT_ADD_ITEM } from '../actions';

import {
  getProductListSuccess,
  getProductListError,
  addProductItemSuccess,
  addProductItemError,
} from './actions';

const getProductListRequest = async () => {
  return api_get(`Product?store=SaleService`);
};

function* getProductListItems() {
  try {
    const response = yield call(getProductListRequest);
    yield put(getProductListSuccess(response.data));
  } catch (error) {
    yield put(getProductListError(error));
  }
}

const addProductItemRequest = async (item) => {
  return api_post(`Product`, item);
};

const editProductItemRequest = async (item) => {
  return api_put(`Product`, item);
};

function* addProductItem({ payload, callback }) {
  try {
    const response = yield call(addProductItemRequest, payload);
    //console.log(response.data);
    yield put(addProductItemSuccess(response.data));
    yield put(callback(response.data));
  } catch (error) {
    yield put(addProductItemError(error));
  }
}

export function* watchGetList() {
  yield takeEvery(PRODUCT_GET_LIST, getProductListItems);
}

export function* wathcAddItem() {
  yield takeEvery(PRODUCT_ADD_ITEM, addProductItem);
}

export default function* rootSaga() {
  yield all([fork(watchGetList), fork(wathcAddItem)]);
}
