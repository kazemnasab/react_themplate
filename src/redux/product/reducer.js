import {
  PRODUCT_GET_LIST,
  PRODUCT_GET_LIST_SUCCESS,
  PRODUCT_GET_LIST_ERROR,
  PRODUCT_ADD_ITEM,
  PRODUCT_ADD_ITEM_SUCCESS,
  PRODUCT_ADD_ITEM_ERROR,
  PRODUCT_SELECTED_ITEMS_CHANGE,
  PRODUCT_EDIT,
  PRODUCT_CANCEL_EDIT
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
  ////console.log(action.payload);
  switch (action.type) {
    case PRODUCT_GET_LIST:
      return { ...state, loading: true };

    case PRODUCT_GET_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        items: action.payload
      };

    case PRODUCT_GET_LIST_ERROR:
      return { ...state, loading: false, error: action.payload };

    case PRODUCT_ADD_ITEM:
      return { ...state, loading: false, editingItem: null };

    case PRODUCT_CANCEL_EDIT:
      return { ...state, editingItem: null };

    case PRODUCT_EDIT:
      return { ...state, editingItem: action.payload };

    case PRODUCT_ADD_ITEM_SUCCESS:
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

    case PRODUCT_ADD_ITEM_ERROR:
      return { ...state, loading: false, error: action.payload };

    case PRODUCT_SELECTED_ITEMS_CHANGE:
      return { ...state, loading: false, selectedItems: action.payload };
    default:
      return { ...state };
  }
};
