import { all } from 'redux-saga/effects'

import editSagas from './edit'
import notificationsSagas from './notifications'
import trashSagas from './trash'


export default function* sagas() {
  yield all([
    ...editSagas,
    ...notificationsSagas,
    ...trashSagas
  ])
}
