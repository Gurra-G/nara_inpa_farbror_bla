import * as Types from "./Types";

export const setFilter = () => {
  return (dispatch) => {
    dispatch({ type: Types.SET_FILTER });
  };
};

export const dropFilter = () => {
  return (dispatch) => {
    dispatch({ type: Types.DROP_FILTER });
  };
};
