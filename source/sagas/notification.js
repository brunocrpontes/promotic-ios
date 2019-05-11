import axios from '../utils/axios'
import { Notifications, Permissions } from 'expo'
import { Types, Prefix } from "../reducers/notification";
import { Types as UserTypes } from '../reducers/user'
import { take, cancel, call, fork, all, select } from 'redux-saga/effects'
import { add } from '../actions/error';

export default function* watchNotification() {
  yield all([
    revoke(),
    subscribe()
  ]);
}

export function* subscribe() {
  while (true) {
    yield take([
      Types.NOTIFICATION_SUBSCRIBE_REQUEST,
      UserTypes.USER_LOGIN_SUCCESS,
      UserTypes.FACEBOOK_LOGIN_SUCCESS
    ]);

    const permission = yield call(requestPermission);

    if (permission !== 'granted') {
      yield put({ type: Types.NOTIFICATION_SUBCRIBE_FAILURE });
      continue
    };

    const token = yield call(Notifications.getExpoPushTokenAsync)
    console.log(token)
    const request = yield fork(requestSubscribe, token)

    yield take([Types.NOTIFICATION_SUBCRIBE_FAILURE, Types.NOTIFICATION_SUBSCRIBE_SUCCESS])
    yield cancel(request)
  }
}

function* requestPermission() {
  let status;

  const { status: currentPermission } = yield call(Permissions.getAsync, Permissions.NOTIFICATIONS);
  status = currentPermission;

  if (status !== 'granted') {
    const { status: finalStatus } = yield call(Permissions.askAsync, Permissions.NOTIFICATIONS);
    status = finalStatus
  }

  return status;
}

function* requestSubscribe(expo_token) {
  const { id } = select(state => state.user);

  try {
    yield call(axios.post, '/client/notification/subscribe', { id, expo_token })

    yield put({ type: Types.NOTIFICATION_SUBSCRIBE_SUCCESS });
  } catch (error) {

  }
}

function* revoke() {
  while (true) {
    yield take([Types.NOTIFICATION_REVOKE_REQUEST, UserTypes.USER_LOGOUT_REQUEST]);
    const token = yield call(Notifications.getExpoPushTokenAsync)
    const request = yield fork(requestRevoke, token)

    yield take([Types.NOTIFICATION_REVOKE_FAILURE, Types.NOTIFICATION_REVOKE_SUCCESS])
    yield cancel(request)
  }
}

function* requestRevoke(expo_token) {

  const { id } = select(state => state.user);

  try {

    yield call(axios.post, '/client/notification/revoke', { id, expo_token })
    yield put({ type: Types.NOTIFICATION_REVOKE_SUCCESS })

  } catch (error) {
    const { message } = error.response.data
    yield put(add(Prefix.revoke, message || error.message))
  }
}
