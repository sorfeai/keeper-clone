import { all } from 'redux-saga/effects';
import editSagas from './edit';
import notificationsSagas from './notifications';
import trashSagas from './trash';


const sagas = function* () {
  yield all([
    ...editSagas,
    ...notificationsSagas,
    ...trashSagas,
  ]);
};


export default sagas;
