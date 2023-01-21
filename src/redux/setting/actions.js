// eslint-disable-next-line import/no-cycle
import {
  SETTING_GET_LIST,
  SETTING_GET_LIST_SUCCESS,
  SETTING_GET_LIST_ERROR,
  SETTING_ADD_ITEM,
  SETTING_ADD_ITEM_SUCCESS,
  SETTING_ADD_ITEM_ERROR,
  SETTING_SELECTED_ITEMS_CHANGE,
  SETTING_NEW,
  SETTING_EDIT,
  SETTING_CANCEL_EDIT
} from '../actions';

export const getSettingList = () => ({
  type: SETTING_GET_LIST,
});

export const getSettingListSuccess = (items) => ({
  type: SETTING_GET_LIST_SUCCESS,
  payload: items,
});

export const getSettingListError = (error) => ({
  type: SETTING_GET_LIST_ERROR,
  payload: error,
});

export const addSettingItem = (item) => ({
  type: SETTING_ADD_ITEM,
  payload: item,
});

export const cancelEditSetting = () => ({
  type: SETTING_CANCEL_EDIT,
});

export const editSetting = (item) => ({
  type: SETTING_EDIT,
  payload: item,
});

export const addSettingItemSuccess = (items) => ({
  type: SETTING_ADD_ITEM_SUCCESS,
  payload: items,
});

export const addSettingItemError = (error) => ({
  type: SETTING_ADD_ITEM_ERROR,
  payload: error,
});

export const selectedSettingItemsChange = (selectedItems) => ({
  type: SETTING_SELECTED_ITEMS_CHANGE,
  payload: selectedItems,
});
