import { Types } from "../reducers/connection";

export function updateConnectionState(state) {
  return {
    type: Types.CONNECTION_STATE_UPDATE,
    payload: state
  };
}
