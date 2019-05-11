import { Types } from "../reducers/notification";

export function subscribe() {
  return {
    type: Types.NOTIFICATION_SUBSCRIBE_REQUEST
  }
}

export function revoke() {
  return {
    type: Types.NOTIFICATION_REVOKE_REQUEST
  }
}
