import { createStore, applyMiddleware } from "redux";
import reducers from "../reducers";
import createSagaMiddleware from "redux-saga";
import sagas from "../sagas";

const saga = createSagaMiddleware();

const store = createStore(reducers, applyMiddleware(saga));

saga.run(sagas);

export default store;
