import * as Types from "./Types";

//handles the registering of a new user based on passed in credentials by dispatching an action
export const register = (firebase, credentials) => {
  return (dispatch) => {
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

//handles the singin in of a existing user based on passed in credentials by dispatching an action
export const signIn = (firebase, credentials) => {
  return (dispatch) => {
    dispatch({ type: Types.TRY_TO_SIGN_IN });
    firebase
      .login({ email: credentials.email, password: credentials.password })
      .then(() => {
        dispatch({ type: Types.SUCCEEDED_TO_SIGN_IN });
        dispatch({
          type: Types.OPEN_CUSTOMSNACKBAR,
          payload: {
            text: `Välkommen ${credentials.email}!`,
            color: "success",
          },
        });
      })
      .catch(() => {
        dispatch({ type: Types.FAILED_TO_SIGN_IN });
      });
  };
};

//handles singin out an existing user based on passed in credentials by dispatching an action
export const signOut = (firebase) => {
  return (dispatch) => {
    dispatch({ type: Types.TRY_TO_SIGN_OUT });
    firebase
      .logout()
      .then(() => {
        dispatch({ type: Types.SUCCEEDED_TO_SIGN_OUT });

        dispatch({
          type: Types.OPEN_CUSTOMSNACKBAR,
          payload: { text: "Du är nu utloggad!", color: "success" },
        });
      })
      .catch(() => {
        dispatch({ type: Types.FAILED_TO_SIGN_OUT });
      });
  };
};
