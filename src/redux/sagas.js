import { all } from 'redux-saga/effects';
import statusType from './status/saga';
import profile from './profile/saga';
import productcategory from './productcategory/saga';
import product from './product/saga';
import failure from './failure/saga';
import setting from './setting/saga';
import dialogModal from './dialogModal/saga';

export default function* rootSaga() {
  yield all([
    profile(),
    productcategory(),
    product(),
    failure(),
    setting(),
    statusType(),
    dialogModal(),
  ]);
}
