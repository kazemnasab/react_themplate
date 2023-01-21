import {
  STATUS_GET_LIST,
  STATUS_GET_LIST_SUCCESS,
  STATUS_GET_LIST_ERROR,
  STATUS_ADD_ITEM,
  STATUS_ADD_ITEM_SUCCESS,
  STATUS_ADD_ITEM_ERROR,
  STATUS_SELECTED_ITEMS_CHANGE,
  STATUS_EDIT,
  STATUS_CANCEL_EDIT
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
    case STATUS_GET_LIST:
      return { ...state, loading: true };

    case STATUS_GET_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        items: action.payload
      };

    case STATUS_GET_LIST_ERROR:
      return { ...state, loading: false, error: action.payload };

    case STATUS_ADD_ITEM:
      return { ...state, loading: false, editingItem: null };

    case STATUS_CANCEL_EDIT:
      return { ...state, editingItem: null };

    case STATUS_EDIT:
      return { ...state, editingItem: action.payload };

    case STATUS_ADD_ITEM_SUCCESS:
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

    case STATUS_ADD_ITEM_ERROR:
      return { ...state, loading: false, error: action.payload };

    case STATUS_SELECTED_ITEMS_CHANGE:
      return { ...state, loading: false, selectedItems: action.payload };
    default:
      return { ...state };
  }
};
