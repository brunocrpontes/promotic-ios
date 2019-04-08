import user from "./user";
import error from "./error";
import loading from "./loading";
import tickets from "./tickets";
import connection from "./connection";
import { combineReducers } from "redux";

export default combineReducers({
  connection,
  loading,
  tickets,
  error,
  user
});
