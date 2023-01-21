import {
  PRODUCT_CATEGORY_GET_LIST,
  PRODUCT_CATEGORY_GET_LIST_SUCCESS,
  PRODUCT_CATEGORY_GET_LIST_ERROR,
  PRODUCT_CATEGORY_ADD_ITEM,
  PRODUCT_CATEGORY_ADD_ITEM_SUCCESS,
  PRODUCT_CATEGORY_ADD_ITEM_ERROR,
  PRODUCT_CATEGORY_SELECTED_ITEMS_CHANGE,
  PRODUCT_CATEGORY_EDIT,
  PRODUCT_CATEGORY_CANCEL_EDIT
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
    case PRODUCT_CATEGORY_GET_LIST:
      return { ...state, loading: true };

    case PRODUCT_CATEGORY_GET_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        items: action.payload
      };

    case PRODUCT_CATEGORY_GET_LIST_ERROR:
      return { ...state, loading: false, error: action.payload };

    case PRODUCT_CATEGORY_ADD_ITEM:
      return { ...state, loading: false, editingItem: null };

    case PRODUCT_CATEGORY_CANCEL_EDIT:
      return { ...state, editingItem: null };

    case PRODUCT_CATEGORY_EDIT:
      return { ...state, editingItem: action.payload };

    case PRODUCT_CATEGORY_ADD_ITEM_SUCCESS:
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

    case PRODUCT_CATEGORY_ADD_ITEM_ERROR:
      return { ...state, loading: false, error: action.payload };

    case PRODUCT_CATEGORY_SELECTED_ITEMS_CHANGE:
      return { ...state, loading: false, selectedItems: action.payload };
    default:
      return { ...state };
  }
};
