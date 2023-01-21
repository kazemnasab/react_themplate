// eslint-disable-next-line import/no-cycle
import {
  PRODUCT_GET_LIST,
  PRODUCT_GET_LIST_SUCCESS,
  PRODUCT_GET_LIST_ERROR,
  PRODUCT_ADD_ITEM,
  PRODUCT_ADD_ITEM_SUCCESS,
  PRODUCT_ADD_ITEM_ERROR,
  PRODUCT_SELECTED_ITEMS_CHANGE,
  PRODUCT_NEW,
  PRODUCT_EDIT,
  PRODUCT_CANCEL_EDIT
} from '../actions';

export const getProductList = () => ({
  type: PRODUCT_GET_LIST,
});

export const getProductListSuccess = (items) => ({
  type: PRODUCT_GET_LIST_SUCCESS,
  payload: items,
});

export const getProductListError = (error) => ({
  type: PRODUCT_GET_LIST_ERROR,
  payload: error,
});

export const addProductItem = (item, callback) => ({
  type: PRODUCT_ADD_ITEM,
  payload: item,
});

export const cancelEditProduct = () => ({
  type: PRODUCT_CANCEL_EDIT,
});

export const editProduct = (item) => ({
  type: PRODUCT_EDIT,
  payload: item,
});

export const addProductItemSuccess = (items) => ({
  type: PRODUCT_ADD_ITEM_SUCCESS,
  payload: items,
});

export const addProductItemError = (error) => ({
  type: PRODUCT_ADD_ITEM_ERROR,
  payload: error,
});

export const selectedProductItemsChange = (selectedItems) => ({
  type: PRODUCT_SELECTED_ITEMS_CHANGE,
  payload: selectedItems,
});
