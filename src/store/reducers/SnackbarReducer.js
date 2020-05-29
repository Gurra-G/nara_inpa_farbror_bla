import * as Types from "../actions/Types";

const INIT_STATE = {
  open: false,
  text: "",
  color: "",
};

//handles the displaying, color and text of our alert function
const SnackbarReducer = (state = INIT_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case Types.OPEN_CUSTOMSNACKBAR:
      return {
        ...state,
        open: true,
        text: payload.text,
        color: payload.color,
      };
    case Types.CLOSE_CUSTOMSNACKBAR:
      return {
        ...state,
        open: false,
      };
    default:
      return state;
  }
};

export default SnackbarReducer;
