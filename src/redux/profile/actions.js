// eslint-disable-next-line import/no-cycle
import {
  PROFILE_GET_LIST,
  PROFILE_GET_LIST_SUCCESS,
  PROFILE_GET_LIST_ERROR,
  PROFILE_ADD_ITEM,
  PROFILE_ADD_ITEM_SUCCESS,
  PROFILE_ADD_ITEM_ERROR,
  PROFILE_SELECTED_ITEMS_CHANGE,
  PROFILE_NEW,
  PROFILE_EDIT,
  PROFILE_CANCEL_EDIT
} from '../actions';

export const getProfileList = () => ({
  type: PROFILE_GET_LIST,
});

export const getProfileListSuccess = (items) => ({
  type: PROFILE_GET_LIST_SUCCESS,
  payload: items,
});

export const getProfileListError = (error) => ({
  type: PROFILE_GET_LIST_ERROR,
  payload: error,
});

export const addProfileItem = (item) => ({
  type: PROFILE_ADD_ITEM,
  payload: item,
});

export const cancelEditProfile = () => ({
  type: PROFILE_CANCEL_EDIT,
});

export const editProfile = (item) => ({
  type: PROFILE_EDIT,
  payload: item,
});

export const addProfileItemSuccess = (items) => ({
  type: PROFILE_ADD_ITEM_SUCCESS,
  payload: items,
});

export const addProfileItemError = (error) => ({
  type: PROFILE_ADD_ITEM_ERROR,
  payload: error,
});

export const selectedProfileItemsChange = (selectedItems) => ({
  type: PROFILE_SELECTED_ITEMS_CHANGE,
  payload: selectedItems,
});
