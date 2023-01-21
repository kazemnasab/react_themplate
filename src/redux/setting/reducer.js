import {
  SETTING_GET_LIST,
  SETTING_GET_LIST_SUCCESS,
  SETTING_GET_LIST_ERROR,
  SETTING_ADD_ITEM,
  SETTING_ADD_ITEM_SUCCESS,
  SETTING_ADD_ITEM_ERROR,
  SETTING_SELECTED_ITEMS_CHANGE,
  SETTING_EDIT,
  SETTING_CANCEL_EDIT
} from '../actions';

const INIT_STATE = {
  loading: false,
  items: [],
  editingItem: null,
  selectedItems: [],
  error: "",
  message: ""
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case SETTING_GET_LIST:
      return { ...state, loading: true };

    case SETTING_GET_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        items: action.payload
      };

    case SETTING_GET_LIST_ERROR:
      return { ...state, loading: false, error: action.payload };

    case SETTING_ADD_ITEM:
      return { ...state, loading: false, editingItem: null };

    case SETTING_CANCEL_EDIT:
      return { ...state, editingItem: null };

    case SETTING_EDIT:
      return { ...state, editingItem: action.payload };

    case SETTING_ADD_ITEM_SUCCESS:
      if (!state.items.find(m=>m.id == action.payload.id))
        return {
          ...state,
          loading: false,
          items: [...state.items, action.payload],
        };
        return {
          ...state,
          loading: false,
          items: state.items.map((item) => item.id == action.payload.id ? action.payload : {...item})
        };

    case SETTING_ADD_ITEM_ERROR:
      return { ...state, loading: false, error: action.payload };

    case SETTING_SELECTED_ITEMS_CHANGE:
      return { ...state, loading: false, selectedItems: action.payload };
    default:
      return { ...state };
  }
};
