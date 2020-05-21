import * as Types from "./Types";

export const register = (credentials) => {
  return (dispatch, getFirebase) => {
    dispatch({ type: Types.TRY_TO_REGISTER });
    const firebase = getFirebase();
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

export const signIn = (credentials) => {
  return (dispatch, getFirebase) => {
    dispatch({ type: Types.TRY_TO_SIGN_IN });
    const firebase = getFirebase();
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

export const signOut = () => {
  return (dispatch, getFirebase) => {
    dispatch({ type: Types.TRY_TO_SIGN_OUT });
    const firebase = getFirebase();
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
