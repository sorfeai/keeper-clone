import { all } from 'redux-saga/effects';

import selectSagas from './select';
import pinSagas from './pin';
import editSagas from './edit';
import notificationsSagas from './notifications';
import trashSagas from './trash';
import tagsSagas from './tags';


const sagas = function* () {
  yield all([
    ...selectSagas,
    ...pinSagas,
    ...editSagas,
    ...notificationsSagas,
    ...trashSagas,
    ...tagsSagas,
  ]);
};


export default sagas;
