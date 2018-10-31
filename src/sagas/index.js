import { all } from 'redux-saga/effects';

import appSagas from './app';
import feedSagas from './feed';
import selectSagas from './select';
import pinSagas from './pin';
import editSagas from './edit';
import notificationsSagas from './notifications';
import trashSagas from './trash';
import tagsSagas from './tags';


const sagas = function* () {
  yield all([
    ...appSagas,
    ...feedSagas,
    ...selectSagas,
    ...pinSagas,
    ...editSagas,
    ...notificationsSagas,
    ...trashSagas,
    ...tagsSagas,
  ]);
};


export default sagas;
