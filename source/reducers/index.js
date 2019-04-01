import user from "./user";
import error from "./error";
import loading from "./loading";
import { combineReducers } from "redux";

export default combineReducers({
  loading,
  error,
  user
});
