import * as Types from "./Types";

//triggers showing only saved events
export const setFilter = () => {
  return (dispatch) => {
    dispatch({ type: Types.SET_FILTER });
  };
};

//drops the current filter and allows the user to see all events
export const dropFilter = () => {
  return (dispatch) => {
    dispatch({ type: Types.DROP_FILTER });
  };
};
