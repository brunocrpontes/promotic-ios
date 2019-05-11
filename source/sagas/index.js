import { all, fork } from "redux-saga/effects";
import rootSagaUser from "./user";
import rootSagaConnection from "./connection";
import rootSagaTicket from "./ticket";
import rootSagaNotification from './notification'

export default function* () {
  yield all([
    fork(rootSagaUser),
    fork(rootSagaTicket),
    fork(rootSagaConnection),
    fork(rootSagaNotification)
  ]);
}
