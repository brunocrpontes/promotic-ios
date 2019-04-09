export const Prefix = {
  USER_SIGNUP: "USER_SIGNUP",
  USER_LOGIN: "USER_LOGIN",
  FACEBOOK_LOGIN: "FACEBOOK_LOGIN",
  USER_LOGOUT: "USER_LOGOUT",
  USER_UPDATE_DATA: "USER_UPDATE_DATA",
  USER_DELETE: "USER_DELETE"
};

export const Types = {
  //SIGNUP
  USER_SIGNUP_REQUEST: `${Prefix.USER_SIGNUP}_REQUEST`,
  USER_SIGNUP_SUCCESS: `${Prefix.USER_SIGNUP}_SUCCESS`,
  USER_SIGNUP_FAILURE: `${Prefix.USER_SIGNUP}_FAILURE`,

  //LOGIN
  USER_LOGIN_REQUEST: `${Prefix.USER_LOGIN}_REQUEST`,
  USER_LOGIN_SUCCESS: `${Prefix.USER_LOGIN}_SUCCESS`,
  USER_LOGIN_FAILURE: `${Prefix.USER_LOGIN}_FAILURE`,

  FACEBOOK_LOGIN_REQUEST: `${Prefix.FACEBOOK_LOGIN}_REQUEST`,
  FACEBOOK_LOGIN_SUCCESS: `${Prefix.FACEBOOK_LOGIN}_SUCCESS`,
  FACEBOOK_LOGIN_FAILURE: `${Prefix.FACEBOOK_LOGIN}_FAILURE`,

  //LOGOUT
  USER_LOGOUT_REQUEST: `${Prefix.USER_LOGOUT}_REQUEST`,
  USER_LOGOUT_SUCCESS: `${Prefix.USER_LOGOUT}_SUCCESS`,
  USER_LOGOUT_FAILURE: `${Prefix.USER_LOGOUT}_FAILURE`,

  USER_DELETE_REQUEST: `${Prefix.USER_DELETE}_REQUEST`,
  USER_DELETE_SUCCESS: `${Prefix.USER_DELETE}_SUCCESS`,
  USER_DELETE_FAILURE: `${Prefix.USER_DELETE}_FAILURE`,

  //UPDATE DATA
  USER_UPDATE_DATA_REQUEST: `${Prefix.USER_UPDATE_DATA}_REQUEST`,
  USER_UPDATE_DATA_SUCCESS: `${Prefix.USER_UPDATE_DATA}_SUCCESS`,
  USER_UPDATE_DATA_FAILURE: `${Prefix.USER_UPDATE_DATA}_FAILURE`
};

const INITIAL_STATE = {
  id: "",
  nome: "",
  cpf: "",
  telefone: "",
  email: "",
  isAuthenticated: false
};

export default function user(state = INITIAL_STATE, action) {
  const { payload, type } = action;

  switch (type) {
    case Types.USER_LOGIN_SUCCESS:
    case Types.FACEBOOK_LOGIN_SUCCESS:
    case Types.USER_UPDATE_DATA_SUCCESS:
      if (payload.id === null) return INITIAL_STATE;

      return { ...state, ...payload, isAuthenticated: true };

    case Types.USER_DELETE_SUCCESS:
    case Types.USER_LOGOUT_SUCCESS:
      return INITIAL_STATE;

    default:
      return state;
  }
}
