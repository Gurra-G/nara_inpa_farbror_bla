import * as Types from "./Types";

export const register = (firebase, credentials) => {
  return dispatch => {
    dispatch({ type: Types.TRY_TO_REGISTER });
    firebase
      .createUser({ email: credentials.email, password: credentials.password })
      .then(() => {
        dispatch({ type: Types.SUCCEEDED_TO_REGISTER });
      })
      .catch(() => {
        dispatch({ type: Types.FAILED_TO_REGISTER });
      });
  };
};

export const signIn = (firebase, credentials) => {
  return dispatch => {
    console.log(credentials);
    dispatch({ type: Types.TRY_TO_SIGN_IN });
    firebase
      .login({ email: credentials.email, password: credentials.password })
      .then(() => {
        dispatch({ type: Types.SUCCEEDED_TO_SIGN_IN });
      })
      .catch(() => {
        dispatch({ type: Types.FAILED_TO_SIGN_IN });
      });
  };
};

export const signOut = firebase => {
  return dispatch => {
    dispatch({ type: Types.TRY_TO_SIGN_OUT });
    firebase
      .logout()
      .then(() => {
        dispatch({ type: Types.SUCCEEDED_TO_SIGN_OUT });
      })
      .catch(() => {
        dispatch({ type: Types.FAILED_TO_SIGN_OUT });
      });
  };
};
