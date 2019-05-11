import { take, put } from "redux-saga/effects";
import { Types, Prefix } from "../reducers/connection";
import * as error from "../actions/error";

export default function* rootSagaConnection() {
  while (true) {
    const { payload } = yield take(Types.CONNECTION_STATE_UPDATE);
    if (!payload)
      yield put(
        error.add(Prefix.CONNECTION_STATE, "Sem conexão com de internet")
      );
  }
}
