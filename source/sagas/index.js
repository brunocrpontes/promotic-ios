import { all, fork } from "redux-saga/effects";
import rootSagaUser from "./user";
import rootSagaConnection from "./connection";
import rootSagaTicket from "./ticket";

export default function*() {
  yield all([
    fork(rootSagaUser),
    fork(rootSagaConnection),
    fork(rootSagaTicket)
  ]);
}
