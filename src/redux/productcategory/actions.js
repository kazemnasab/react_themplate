// eslint-disable-next-line import/no-cycle
import {
  PRODUCT_CATEGORY_GET_LIST,
  PRODUCT_CATEGORY_GET_LIST_SUCCESS,
  PRODUCT_CATEGORY_GET_LIST_ERROR,
  PRODUCT_CATEGORY_ADD_ITEM,
  PRODUCT_CATEGORY_ADD_ITEM_SUCCESS,
  PRODUCT_CATEGORY_ADD_ITEM_ERROR,
  PRODUCT_CATEGORY_SELECTED_ITEMS_CHANGE,
  PRODUCT_CATEGORY_NEW,
  PRODUCT_CATEGORY_EDIT,
  PRODUCT_CATEGORY_CANCEL_EDIT
} from '../actions';

export const getProductCategoryList = () => ({
  type: PRODUCT_CATEGORY_GET_LIST,
});

export const getProductCategoryListSuccess = (items) => ({
  type: PRODUCT_CATEGORY_GET_LIST_SUCCESS,
  payload: items,
});

export const getProductCategoryListError = (error) => ({
  type: PRODUCT_CATEGORY_GET_LIST_ERROR,
  payload: error,
});

export const addProductCategoryItem = (item) => ({
  type: PRODUCT_CATEGORY_ADD_ITEM,
  payload: item,
});

export const cancelEditProductCategory = () => ({
  type: PRODUCT_CATEGORY_CANCEL_EDIT,
});

export const editProductCategory = (item) => ({
  type: PRODUCT_CATEGORY_EDIT,
  payload: item,
});

export const addProductCategoryItemSuccess = (items) => ({
  type: PRODUCT_CATEGORY_ADD_ITEM_SUCCESS,
  payload: items,
});

export const addProductCategoryItemError = (error) => ({
  type: PRODUCT_CATEGORY_ADD_ITEM_ERROR,
  payload: error,
});

export const selectedProductCategoryItemsChange = (selectedItems) => ({
  type: PRODUCT_CATEGORY_SELECTED_ITEMS_CHANGE,
  payload: selectedItems,
});
