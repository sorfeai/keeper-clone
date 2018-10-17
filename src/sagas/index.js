import { all } from 'redux-saga/effects';
import selectSagas from './select';
import editSagas from './edit';
import notificationsSagas from './notifications';
import trashSagas from './trash';


const sagas = function* () {
  yield all([
    ...selectSagas,
    ...editSagas,
    ...notificationsSagas,
    ...trashSagas,
  ]);
};


export default sagas;
