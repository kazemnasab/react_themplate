// eslint-disable-next-line import/no-cycle
import {
  FAILURE_GET_LIST,
  FAILURE_GET_LIST_SUCCESS,
  FAILURE_GET_LIST_ERROR,
  FAILURE_ADD_ITEM,
  FAILURE_ADD_ITEM_SUCCESS,
  FAILURE_ADD_ITEM_ERROR,
  FAILURE_SELECTED_ITEMS_CHANGE,
  FAILURE_NEW,
  FAILURE_EDIT,
  FAILURE_CANCEL_EDIT
} from '../actions';

export const getFailureList = () => ({
  type: FAILURE_GET_LIST,
});

export const getFailureListSuccess = (items) => ({
  type: FAILURE_GET_LIST_SUCCESS,
  payload: items,
});

export const getFailureListError = (error) => ({
  type: FAILURE_GET_LIST_ERROR,
  payload: error,
});

export const addFailureItem = (item) => ({
  type: FAILURE_ADD_ITEM,
  payload: item,
});

export const cancelEditFailure = () => ({
  type: FAILURE_CANCEL_EDIT,
});

export const editFailure = (item) => ({
  type: FAILURE_EDIT,
  payload: item,
});

export const addFailureItemSuccess = (items) => ({
  type: FAILURE_ADD_ITEM_SUCCESS,
  payload: items,
});

export const addFailureItemError = (error) => ({
  type: FAILURE_ADD_ITEM_ERROR,
  payload: error,
});

export const selectedFailureItemsChange = (selectedItems) => ({
  type: FAILURE_SELECTED_ITEMS_CHANGE,
  payload: selectedItems,
});
