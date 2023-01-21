import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import {api_get, api_post,api_put} from 'api/core'
import { PRODUCT_CATEGORY_GET_LIST, PRODUCT_CATEGORY_ADD_ITEM } from '../actions';

import {
  getProductCategoryListSuccess,
  getProductCategoryListError,
  addProductCategoryItemSuccess,
  addProductCategoryItemError,
} from './actions';

const getProductCategoryListRequest = async () => {
  return api_get(`ProductCategory?store=SaleService`);
};

function* getProductCategoryListItems() {
  try {
    const response = yield call(getProductCategoryListRequest);
    yield put(getProductCategoryListSuccess(response.data));
  } catch (error) {
    yield put(getProductCategoryListError(error));
  }
}

const addProductCategoryItemRequest = async (item) => {
  return api_post(`ProductCategory`, item);
};

const editProductCategoryItemRequest = async (item) => {
  return api_put(`ProductCategory`, item);
};

function* addProductCategoryItem({ payload }) {
  try {
    const response = yield call(addProductCategoryItemRequest, payload);
    //console.log(response);
    yield put(addProductCategoryItemSuccess(response.data));
  } catch (error) {
    yield put(addProductCategoryItemError(error));
  }
}

export function* watchGetList() {
  yield takeEvery(PRODUCT_CATEGORY_GET_LIST, getProductCategoryListItems);
}

export function* wathcAddItem() {
  yield takeEvery(PRODUCT_CATEGORY_ADD_ITEM, addProductCategoryItem);
}

export default function* rootSaga() {
  yield all([fork(watchGetList), fork(wathcAddItem)]);
}
