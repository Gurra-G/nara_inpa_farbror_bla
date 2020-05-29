import * as Types from "../actions/Types";

const INIT_STATE = {
  data: {
    text: "",
    color: "",
    success: false,
  },
};

//handles the sign in form submission
const AuthReducer = (state = INIT_STATE, action) => {
  const { type } = action;
  switch (type) {
    case Types.TRY_TO_SIGN_IN:
      return {
        ...state,
        data: {
          text: "Laddar...",
          color: "default",
        },
      };
    case Types.SUCCEEDED_TO_SIGN_IN:
      return {
        ...state,
        data: {
          success: true,
        },
      };
    case Types.FAILED_TO_SIGN_IN:
      return {
        ...state,
        data: {
          text: "Något gick snett, vänligen försök igen!",
          color: "error",
        },
      };
    default:
      return state;
  }
};

export default AuthReducer;
