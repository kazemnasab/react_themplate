import {
  FAILURE_GET_LIST,
  FAILURE_GET_LIST_SUCCESS,
  FAILURE_GET_LIST_ERROR,
  FAILURE_ADD_ITEM,
  FAILURE_ADD_ITEM_SUCCESS,
  FAILURE_ADD_ITEM_ERROR,
  FAILURE_SELECTED_ITEMS_CHANGE,
  FAILURE_EDIT,
  FAILURE_CANCEL_EDIT
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
    case FAILURE_GET_LIST:
      return { ...state, loading: true };

    case FAILURE_GET_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        items: action.payload
      };

    case FAILURE_GET_LIST_ERROR:
      return { ...state, loading: false, error: action.payload };

    case FAILURE_ADD_ITEM:
      return { ...state, loading: false, editingItem: null };

    case FAILURE_CANCEL_EDIT:
      return { ...state, editingItem: null };

    case FAILURE_EDIT:
      return { ...state, editingItem: action.payload };

    case FAILURE_ADD_ITEM_SUCCESS:
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

    case FAILURE_ADD_ITEM_ERROR:
      return { ...state, loading: false, error: action.payload };

    case FAILURE_SELECTED_ITEMS_CHANGE:
      return { ...state, loading: false, selectedItems: action.payload };
    default:
      return { ...state };
  }
};
