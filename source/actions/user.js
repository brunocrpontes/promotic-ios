import { Types } from "../reducers/user";
/**
 *
 * SIGNUP ACTIONS
 */
export function signUp(user) {
  return {
    type: Types.USER_SIGNUP_REQUEST,
    payload: user
  };
}

export function signUpSucess() {
  return {
    type: Types.USER_SIGNUP_SUCCESS
  };
}

export function signUpFailure(message) {
  return {
    type: Types.USER_SIGNUP_FAILURE,
    payload: message
  };
}

export function removeSignUpError() {
  return {
    type: Types.USER_SIGNUP_REMOVE_ERROR
  };
}

/**
 *
 * LOGIN ACTIONS
 */
export function login(email, password) {
  return {
    type: Types.USER_LOGIN_REQUEST,
    payload: { email, password }
  };
}

export function loginSuccess(user) {
  return {
    type: Types.USER_LOGIN_SUCCESS,
    payload: user
  };
}

export function loginFailure(message) {
  return {
    type: Types.USER_LOGIN_FAILURE,
    payload: message
  };
}

export function removeLoginError() {
  return {
    type: Types.USER_LOGIN_REMOVE_ERROR
  };
}

/**
 *
 * LOGOUT ACTIONS
 */
export function logout() {
  return {
    type: Types.USER_LOGOUT_REQUEST
  };
}

export function logoutSuccess() {
  return {
    type: Types.USER_LOGOUT_SUCCESS
  };
}

/**
 *
 * UPDATE USER DATA ACTIONS
 */
export function requestUpdateUserData(user) {
  return {
    type: Types.USER_UPDATE_DATA_REQUEST,
    payload: user
  };
}

export function requestUpdateUserDataSuccess(user) {
  return {
    type: Types.USER_UPDATE_DATA_SUCCESS,
    payload: user
  };
}

export function requestDeleteAccount() {
  return {
    type: Types.USER_DELETE_REQUEST
  };
}

export function requestDeleteAccountSuccess() {
  return {
    type: Types.USER_DELETE_SUCCESS
  };
}

/**
 * SOCIAL LOGINS
 */
export function facebookLogin() {
  return {
    type: Types.FACEBOOK_LOGIN_REQUEST
  };
}

export function facebookLoginSuccess(user) {
  return {
    type: Types.FACEBOOK_LOGIN_SUCCESS,
    payload: user
  };
}
