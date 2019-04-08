import { createStore, applyMiddleware } from "redux";
import reducers from "../reducers";
import createSagaMiddleware from "redux-saga";
import sagas from "../sagas";
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user"]
};

const saga = createSagaMiddleware();

const persistedReducer = persistReducer(persistConfig, reducers);

const store = createStore(persistedReducer, applyMiddleware(saga));
const persistor = persistStore(store);

saga.run(sagas);

export { store, persistor };
