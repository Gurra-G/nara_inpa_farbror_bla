import * as Types from "../actions/Types";

const INIT_STATE = {
  filter: false,
};

const FilterReducer = (state = INIT_STATE, action) => {
  const { type } = action;
  switch (type) {
    case Types.SET_FILTER:
      return {
        ...state,
        filter: true,
      };
    case Types.DROP_FILTER:
      return {
        ...state,
        filter: false,
      };
    default:
      return state;
  }
};

export default FilterReducer;
