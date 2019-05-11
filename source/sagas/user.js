import {
  all,
  takeEvery,
  takeLatest,
  put,
  call,
  fork,
  take,
  cancel,
  select
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
    takeLatest(Types.USER_SIGNUP_REQUEST, signUp),
    takeLatest(Types.USER_UPDATE_DATA_REQUEST, update),
    takeLatest(Types.USER_DELETE_REQUEST, del)
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

    if (!data.ok) {
      yield put(
        ErrorActions.add(Prefix.USER_LOGIN, "Usuário ou Senha Incorretos")
      );
      return;
    }

    yield all([
      call(NavigationService.navigate, "Promotions", { name: data.nome }),
      put(UserActions.loginSuccess(data))
    ]);
  } catch (error) {
    yield put(
      ErrorActions.add(Prefix.USER_LOGIN, "Usuário ou Senha Incorretos")
    );
  }
}

function* logout() {
  yield all([
    put(UserActions.logoutSuccess()),
    call(NavigationService.navigate, "SignIn")
  ]);
}

function* signUp(action) {
  const { payload } = action;

  const { user } = yield select();

  try {
    const {
      data: { error, ok }
    } = yield call(axios.post, "/cliente", { id: user.id, ...payload });

    if (!ok && !error) {
      yield put(
        ErrorActions.add(Prefix.USER_SIGNUP, "Erro na requisição de cadastro")
      );
      return;
    }

    yield call(NavigationService.pop);
  } catch (error) {
    yield put(
      ErrorActions.add(Prefix.USER_SIGNUP, "Erro na requisição de cadastro")
    );
  }
}

function* update(action) {
  const { payload } = action;

  const { user } = yield select();

  try {
    const {
      data: { error, ok }
    } = yield call(axios.post, "/cliente", { id: user.id, ...payload });

    if (!ok && error) {
      yield put(
        ErrorActions.add(
          Prefix.USER_UPDATE_DATA,
          "Erro na requisição de cadastro"
        )
      );
      return;
    }

    yield put(UserActions.requestUpdateUserDataSuccess(payload));
  } catch (error) {
    yield put(
      ErrorActions.add(
        Prefix.USER_UPDATE_DATA,
        "Erro na requisição de cadastro"
      )
    );
  }
}

function* del() {
  const { user } = yield select();

  try {
    const {
      data: { ok }
    } = yield call(axios.post, "/cliente/excluir", { id: user.id });

    if (!ok) {
      yield put(
        ErrorActions.add(Prefix.USER_DELETE, "Erro ao executar a operação")
      );
      return;
    }

    yield all([
      call(NavigationService.navigate("Auth")),
      put(UserActions.requestDeleteAccountSuccess())
    ]);
  } catch (error) {
    yield put(
      ErrorActions.add(
        Prefix.USER_DELETE,
        error.message || "Erro ao executar a operação"
      )
    );
  }
}

function* facebook() {
  const appID = Constants.manifest.facebookAppId;
  const permissions = ["public_profile", "email"];
  const behavior = "web";

  while (true) {
    //FIXME: rewrite function to just do 1 request to the server confirm the login

    yield take(Types.FACEBOOK_LOGIN_REQUEST);
    try {
      const { type, token } = yield call(
        Facebook.logInWithReadPermissionsAsync,
        appID,
        {
          permissions,
          behavior
        }
      );

      if (type === "cancel") {
        yield put(ErrorActions.add(Prefix.FACEBOOK_LOGIN, "Login cancelado"));
        continue;
      }

      const {
        data: { email, name }
      } = yield call(
        axios.get,
        `https://graph.facebook.com/me?access_token=${token}&fields=email,name`
      );

      const requestSignUp = yield call(axios.post, "/cliente", {
        email,
        nome: name
      });

      if (
        !requestSignUp ||
        (!requestSignUp.data.ok && typeof requestSignUp.data.error === "string")
      ) {
        yield put(
          ErrorActions.add(
            Prefix.FACEBOOK_LOGIN,
            requestSignUp.data.error || "Erro ao acessar o aplicativo"
          )
        );
        continue;
      }

      const {
        data: { ok, ...user }
      } = yield call(axios.post, "/cliente/loginsocial", {
        email
      });

      if (!ok) {
        yield put(
          ErrorActions.add(
            Prefix.FACEBOOK_LOGIN,
            "Erro ao acessar o aplicativo"
          )
        );
        continue;
      }

      yield all([
        call(NavigationService.navigate, "Promotions", { name: user.nome }),
        put(UserActions.facebookLoginSuccess(user))
      ]);
    } catch (error) {
      yield put(
        ErrorActions.add(
          Prefix.FACEBOOK_LOGIN,
          error.message || "Erro ao acessar o aplicativo"
        )
      );
    }
  }
}
