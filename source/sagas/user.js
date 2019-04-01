import {
  all,
  takeEvery,
  takeLatest,
  put,
  call,
  fork,
  take,
  cancel
} from "redux-saga/effects";
import { Types, Prefix } from "../reducers/user";
import * as UserActions from "../actions/user";
import * as ErrorActions from "../actions/error";
import axios from "../utils/axios";
import { Facebook, Constants } from "expo";
import NavigationService from "../routes/NavigationService";

export default function* rootSagaUser() {
  yield all([
    authFlow(),
    facebook(),
    takeLatest(Types.USER_LOGOUT_REQUEST, logout),
    takeLatest(Types.USER_SIGNUP_REQUEST, signUp)
    // takeLatest(Types.USER_UPDATE_DATA_REQUEST)
  ]);
}

function* authFlow() {
  while (true) {
    const {
      payload: { email, password }
    } = yield take(Types.USER_LOGIN_REQUEST);

    const task = yield fork(login, email, password);

    const action = yield take([
      Types.USER_LOGIN_FAILURE,
      Types.USER_LOGOUT_FAILURE
    ]);
    if (action.type === Types.USER_LOGIN_FAILURE) yield cancel(task);

    yield call(logout);
  }
}

function* login(email, password) {
  try {
    const { data } = yield call(axios.post, "/cliente/login", {
      email,
      senha: password
    });

    yield put(UserActions.loginSuccess(data));
    yield call(NavigationService.navigate, "Main", { name: data.nome });
  } catch (error) {
    yield put(
      ErrorActions.add(Prefix.USER_LOGIN, "Usuário ou Senha Incorretos")
    );
  }
}

function* logout() {}

function* signUp(action) {
  const { payload } = action;

  const response = yield call(axios.post, "/cliente", payload);

  console.log(response);
}

function* facebook() {
  const appID = Constants.manifest.facebookAppId;
  const permissions = ["public_profile", "email"];

  while (true) {
    yield take("FACEBOOK_LOGIN");
    try {
      const { type, token } = yield call(
        Facebook.logInWithReadPermissionsAsync,
        appID,
        {
          permissions
        }
      );

      console.log(type);

      if (type === "cancel") return;

      const data = yield call(
        axios.get(
          `https://graph.facebook.com/me?access_token=${token}&fields=email,name`
        )
      );

      //TODO: 
    } catch (error) {}
  }
}
