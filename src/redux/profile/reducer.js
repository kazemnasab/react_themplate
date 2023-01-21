import {
  PROFILE_GET_LIST,
  PROFILE_GET_LIST_SUCCESS,
  PROFILE_GET_LIST_ERROR,
  PROFILE_ADD_ITEM,
  PROFILE_ADD_ITEM_SUCCESS,
  PROFILE_ADD_ITEM_ERROR,
  PROFILE_SELECTED_ITEMS_CHANGE,
  PROFILE_EDIT,
  PROFILE_CANCEL_EDIT
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
    case PROFILE_GET_LIST:
      return { ...state, loading: true };

    case PROFILE_GET_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        items: action.payload
      };

    case PROFILE_GET_LIST_ERROR:
      return { ...state, loading: false, error: action.payload };

    case PROFILE_ADD_ITEM:
      return { ...state, loading: false, editingItem: null };

    case PROFILE_CANCEL_EDIT:
      return { ...state, editingItem: null };

    case PROFILE_EDIT:
      return { ...state, editingItem: action.payload };

    case PROFILE_ADD_ITEM_SUCCESS:
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

    case PROFILE_ADD_ITEM_ERROR:
      return { ...state, loading: false, error: action.payload };

    case PROFILE_SELECTED_ITEMS_CHANGE:
      return { ...state, loading: false, selectedItems: action.payload };
    default:
      return { ...state };
  }
};
