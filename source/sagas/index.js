import { all, fork } from "redux-saga/effects";
import rootSagaUser from "./user";
import rootSagaConnection from "./connection";

export default function*() {
  yield all([fork(rootSagaUser), fork(rootSagaConnection)]);
}
