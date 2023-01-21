import { combineReducers } from 'redux';
import statusType from './status/reducer';
import profiles from './profile/reducer';
import productCategories from './productcategory/reducer';
import products from './product/reducer';
import failures from './failure/reducer';
import mysettings from './setting/reducer';
import dialogModal from './dialogModal/reducer';

const reducers = combineReducers({
  profiles,
  productCategories,
  products,
  failures,
  mysettings,
  statusType,
  dialogModal
});

export default reducers;
