// eslint-disable-next-line import/no-cycle
import {
  STATUS_GET_LIST,
  STATUS_GET_LIST_SUCCESS,
  STATUS_GET_LIST_ERROR,
  STATUS_ADD_ITEM,
  STATUS_ADD_ITEM_SUCCESS,
  STATUS_ADD_ITEM_ERROR,
  STATUS_SELECTED_ITEMS_CHANGE,
  STATUS_NEW,
  STATUS_EDIT,
  STATUS_CANCEL_EDIT
} from '../actions';

export const getStatusList = () => ({
  type: STATUS_GET_LIST,
});

export const getStatusListSuccess = (items) => ({
  type: STATUS_GET_LIST_SUCCESS,
  payload: items,
});

export const getStatusListError = (error) => ({
  type: STATUS_GET_LIST_ERROR,
  payload: error,
});

export const addStatusItem = (item) => ({
  type: STATUS_ADD_ITEM,
  payload: item,
});

export const cancelEditStatus = () => ({
  type: STATUS_CANCEL_EDIT,
});

export const editStatus = (item) => ({
  type: STATUS_EDIT,
  payload: item,
});

export const addStatusItemSuccess = (items) => ({
  type: STATUS_ADD_ITEM_SUCCESS,
  payload: items,
});

export const addStatusItemError = (error) => ({
  type: STATUS_ADD_ITEM_ERROR,
  payload: error,
});

export const selectedStatusItemsChange = (selectedItems) => ({
  type: STATUS_SELECTED_ITEMS_CHANGE,
  payload: selectedItems,
});
